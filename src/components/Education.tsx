import React from 'react'

function Education() {
  return (
    <section
      className="section"
      id="education"
      aria-labelledby="education-heading"
    >
      <h2 id="education-heading">Education</h2>

      <div
        className="timeline-item"
        role="article"
        aria-label="VLSI Design degree"
      >
        <span className="year" aria-label="Year: 2nd Year">2nd Year</span>
        <div className="timeline-content">
          <h3>B.E. / B.Tech — VLSI Design & Technology</h3>
          <p>Tamil Nadu, India · Progressing toward core VLSI specialization</p>
        </div>
      </div>

      <div className="section-sub" aria-labelledby="learning-heading">
        <h2 id="learning-heading">Currently Learning</h2>
        <div
          className="skills-grid"
          style={{ marginTop: '12px' }}
          role="list"
          aria-label="Currently learning list"
        >
          {[
            "Verilog + SystemVerilog (Advanced)",
            "Java + Data Structures",
            "Linux RH104",
            "FPGA-based Design"
          ].map((item: string, i: number) => (
            <span
              key={i}
              className="skill-tag learning"
              role="listitem"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education