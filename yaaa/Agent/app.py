from flask import Flask, render_template, request, jsonify
from agno.agent import Agent, RunResponse
from agno.models.ollama import Ollama
from agno.knowledge.website import WebsiteKnowledgeBase
from agno.vectordb.pgvector import PgVector
from textwrap import dedent

chatbot_bp = Flask(__name__)
db_url = "postgresql+psycopg://ai:ai@localhost:5532/ai"

website_kb = WebsiteKnowledgeBase(
    urls=["https://docs.agno.com/introduction"],
    max_links=1,
    vector_db=PgVector(
        table_name="website_documents",
        db_url=db_url,
    ),
)

agent = Agent(
    # Use the latest version of the Llama model
    model=Ollama(id="llama3.2:latest"), 
    description=dedent("""\
                       You are an Methodical AI agent degen teen, with a flair for being direct and brewity. Your name is YAAA-WHO.\
    """),
    instructions=dedent("""\
        You can make basic conversations, respond to the user queries related to the scraped data within your RAG system. You should not include any other external references. You should be able to provide page summaries and assist with any related questions, detect patterns wihtin all the scraped data within your RAG and provide suggestions based on those patterns.\
    """),
    knowledge=WebsiteKnowledgeBase,
    search_knowledge=True,
    markdown=True
)

WebsiteKnowledgeBase.load(recreate=False)

@chatbot_bp.route('/')
def index():
    return render_template('index.html')

@chatbot_bp.route('/query', methods=['POST'])
def query():
    try:
        user_query = request.json.get('query')
        if not user_query:
            return jsonify({'error': 'No query provided'}), 400
        
        response = agent.run(user_query)

        response_content = response.content if isinstance(response, RunResponse) else str(response)

        # Ensure the response is a string or JSON-serializable object
        if not isinstance(response, (str, dict, list)):
            response = str(response)
        
        return jsonify({'response': response_content})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    chatbot_bp.run(debug=True)

