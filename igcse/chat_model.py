import os
from langchain_community.chat_models import ChatOpenAI
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.chains.qa_with_sources import load_qa_with_sources_chain


def initialize_environment(api_key): 
    os.environ['OPENAI_API_KEY'] = api_key

def LLM():
    return ChatOpenAI(temperature=0.5, max_tokens= 800, model="gpt-4o")

def load_vector_index(path):
    try:
        print("Loading vector index...")
        embeddings = OpenAIEmbeddings()
        index = FAISS.load_local(path, embeddings, allow_dangerous_deserialization=True)
        print("Vector index loaded successfully.")
        return index
    except Exception as e:
        return f"Error loading vector index: {e}"
    
    
def igcse_retriever(vector_index, prompt):   
    custom_prompt_template = prompt + f"""
    Context: {{context}}
    Only use the information provided in the context and provide simple and short answers.
    """

    custom_prompt = PromptTemplate(input_variables=["context"], template=custom_prompt_template)
    return vector_index.as_retriever(), custom_prompt


def create_chain(custom_prompt, retriever_instance):
    qa_chain = load_qa_with_sources_chain(
        llm=LLM(),
        chain_type="stuff",
        prompt=custom_prompt,
        document_variable_name="context"
    )
    return RetrievalQA(retriever=retriever_instance, combine_documents_chain=qa_chain)

def get_igcse_response(api_key, prompt, retriever_directory):
    initialize_environment(api_key)
    vector_index = load_vector_index(retriever_directory)
    if isinstance(vector_index, str) and 'Error' in vector_index: 
        return vector_index
    retriever_instance, custom_prompt = igcse_retriever(vector_index, prompt)
    chain = create_chain(custom_prompt, retriever_instance)
    response = chain({"query": prompt, "return_only_outputs": False})
    message = response.get('result')
    return   cleanmessage(message)



import re
def cleanmessage(response):
    cleaned_message = re.sub(r'[`*#]', '',response)
    cleaned_message += "\n\nIf You need more explanation please press the first button below."

    return cleaned_message