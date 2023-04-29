# Flask
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Openai
import openai

# System
import argparse
import base64
import os

# Load env vars
load_dotenv()

# Flask app initialization
app = Flask(__name__)
CORS(app)

# OpenAI definitions
openai.api_key = os.getenv('OPENAI_API_KEY')
MODEL_ID = 'gpt-3.5-turbo'

# ChatGPT conversation handler
def ChatGPT_conversation(conversation):
    # Receive response from ChatGPT
    response = openai.ChatCompletion.create(
        model=MODEL_ID,
        messages=conversation
    )
    
    # Append information to the conversation
    conversation.append({'role': response.choices[0].message.role, 'content': response.choices[0].message.content})
    
    # Return conversation
    return conversation

# GET - Image and Story generator
@app.route('/generate', methods=['GET'])
def generate():
    # Print information
    print("Initializing Call")
    
    # Variable prepping
    conversation = []
    conversation.append(
        {
            'role': 'system', 
            'content': 
                '''Give a short story with a description of an image that would suit each paragraph. Make the whole story by yourself.
                Format = 
                Image Description:
                Paragraph:'''
        }
    )
    conversation = ChatGPT_conversation(conversation)
    ans = ('{0}: {1}\n'.format(conversation[-1]['role'].strip(), conversation[-1]['content'].strip()))

    # Create empty lists for image descriptions, paragraphs, and images
    image_descriptions = []
    paragraphs = []
    images = []

    # Split the answer into lines
    lines = ans.strip().split('\n')
    
    # Loop through each line in the input text
    for i, line in enumerate(lines):
        # Check if the line is an image description
        if line.startswith('Image Description:'):
            # Append the image description to the list
            image_descriptions.append(line[len('Image Description:'):].strip())
        # Check if the line is a paragraph
        elif line.startswith('Paragraph:'):
            # Append the paragraph to the list
            paragraphs.append(line[len('Paragraph:'):].strip())
    
    # Generate images 
    count = 1
    for index, description in enumerate(image_descriptions):
        # Parse the command line arguments
        parser = argparse.ArgumentParser()
        parser.add_argument("-p", "--prompt", help="Text to image prompt:", default=description)
        parser.add_argument("-n", "--number", help="Number of images generated", default=1)
        parser.add_argument("-s", "--size", help="Image size: 256, 512 or 1024", default=1024)

        # Finalize arguments
        args = parser.parse_args()

        # Get the results of the image
        res = openai.Image.create(
            prompt=args.prompt,
            n=int(args.number),
            size=f'{args.size}x{args.size}',
            response_format="b64_json"
        )
        
        # Finalize the image information
        for i in range(len(res['data'])):
            # Get the B64 JSON data of the image
            b64 = res['data'][i]['b64_json']
            
            # Create the file name
            filename = f"image_{count}.png"
            
            # Build the image
            with open(filename, 'wb') as f:
                f.write(base64.urlsafe_b64decode(b64))

            # Add the file name, description, and paragraph to the images list
            images.append({'paragraph': paragraphs[index], 'description': description, 'data': b64})
            
            # Increment count
            count += 1
                
    # Return 
    return images

# Flask app run method
if __name__ == '__main__':
    app.run(port=8080)