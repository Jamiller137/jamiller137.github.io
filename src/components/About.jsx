import jacobImage from "./Images/JacobMiller.jpeg";

const About = () => {
  return (
    <section className="section">
      <div className="about-content">
        <div className="about-text">
          <h2>About Me</h2>
          <p>
            I am a 4th-year graduate student in mathematics at the University of
            Iowa, working under the supervision of Dr. Isabel Darcy. I earned my
            BSc in Mathematics from the University of Rochester in 2022.
          </p>
          <p>
            My research focuses on topological data analysis and visualization
            methods.
          </p>
          <div className="skills">
            <h3>Skills & Technologies</h3>
            <div className="skill-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">R</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">Flask</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">Apptainer/Singularity</span>
              <span className="skill-tag">PostgreSQL</span>
              <span className="skill-tag">LaTeX</span>
            </div>
          </div>
        </div>

        <div className="about-image">
          <img src={jacobImage} alt="Image Unavailable" />
        </div>
      </div>
    </section>
  );
};

export default About;
