import { useTransform, motion } from "framer-motion";

import imgC from "../../assets/c.jpeg";

const ScaledImage = ({ scrollYProgress }) => {
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 0.5], [5, 0]);

    return (
        <motion.div style={{ scale, rotate }} className="relative h-screen">
            <img src={imgC} className="w-full h-full object-cover" />
        </motion.div>
    );
};

export default ScaledImage;
