import { motion } from "motion/react"

export default function Tst() {
    return (
      <motion.div
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#ff0088",
              borderRadius: 5,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1 }}
        />
    )
}