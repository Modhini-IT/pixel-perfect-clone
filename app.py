import streamlit as st

# Page config
st.set_page_config(
    page_title="My Streamlit Website",
    page_icon="🌐",
    layout="wide"
)

# Header
st.title("🚀 My Streamlit Website")
st.write("Built with Streamlit")

# Sidebar
st.sidebar.header("Navigation")
page = st.sidebar.selectbox(
    "Go to",
    ["Home", "About", "Contact"]
)

# Pages
if page == "Home":
    st.header("Home")
    st.write("Welcome to my Streamlit website!")
    st.button("Click me")

elif page == "About":
    st.header("About")
    st.write("""
    This website is built using *Streamlit*.
    You can deploy it easily and iterate fast.
    """)

elif page == "Contact":
    st.header("Contact")
    name = st.text_input("Your name")
    message = st.text_area("Your message")
    if st.button("Submit"):
        st.success(f"Thanks {name}, message received!")
