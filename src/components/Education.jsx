import React from 'react'

function Education() {
  return (
    <section className="section" id="education">
      <h2>Education</h2>
      <div className="timeline-item">
        <span className="year">2nd Year</span>
        <div className="timeline-content">
          <h3>B.E. / B.Tech — VLSI Design & Technology</h3>
          <p>Tamil Nadu, India · Progressing toward core VLSI specialization</p>
        </div>
      </div>

      <div className="section-sub">
        <h2>Currently Learning</h2>
        <div className="skills-grid" style={{ marginTop: '12px' }}>
          {["Verilog + SystemVerilog (Advanced)", "Java + Data Structures", "Linux RH104", "FPGA-based Design"].map((item, i) => (
            <span key={i} className="skill-tag learning">{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education