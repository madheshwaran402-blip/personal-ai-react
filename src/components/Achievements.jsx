import { motion } from 'framer-motion'
import { fadeUp, scaleUp, staggerContainer, staggerItem } from '../utils/animations'

function Achievements() {
  return (
    <motion.section
      className="section"
      id="achievements"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2>Achievements</h2>

      <motion.div
        className="achievement-card"
        variants={scaleUp}
        whileHover={{ scale: 1.01 }}
      >
        <div className="achievement-icon">🥇</div>
        <div className="achievement-info">
          <h3>IDEATHON 1.0 Winner</h3>
          <p>PSNA College of Engineering & Technology — IT Dept</p>
          <p className="achievement-meta">
            Team Determinex · Industry Innovation & Infrastructure · Medal + Cash Prize
          </p>
        </div>
      </motion.div>

      <div className="section-sub">
        <h2>Startup Vision</h2>
        <motion.div
          className="startup-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="startup-card" variants={staggerItem} whileHover={{ scale: 1.02 }}>
            <h4>Determinex</h4>
            <p>Data integrity and event-driven hardware systems</p>
          </motion.div>
          <motion.div className="startup-card" variants={staggerItem} whileHover={{ scale: 1.02 }}>
            <h4>Safety Watch Platform</h4>
            <p>Offline wearable-to-wearable alert system — Hospital, Elder, Child, Couple</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Achievements