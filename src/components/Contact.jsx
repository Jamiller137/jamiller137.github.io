const Contact = () => {
  return (
    <section className="section">
      <h2>Get In Touch</h2>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-methods">
            <div className="contact-method">
              <h3>Email</h3>
              <a href="mailto:jacob-miller-2@uiowa.edu">
                jacob-miller-2@uiowa.edu
              </a>
            </div>

            <div className="contact-method">
              <h3>Social</h3>
              <div className="social-links">
                <a
                  href="https://github.com/jamiller137"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
