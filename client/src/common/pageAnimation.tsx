import {
	AnimatePresence,
	AnimationControls,
	Target,
	TargetAndTransition,
	VariantLabels,
	motion,
	Transition,
} from "framer-motion";

type AnimationWrapperProps = {
	children: React.ReactNode;
	keyValue?: string;
	initial?: boolean | Target | VariantLabels;
	animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
	transition?: Transition;
	className?: string;
};

const AnimationWrapper = ({
	children,
	keyValue,
	initial = { opacity: 0 },
	animate = { opacity: 1 },
	transition = { duration: 0.5 },
	className,
}: AnimationWrapperProps) => {
	return (
		<AnimatePresence>
			<motion.div
				key={keyValue}
				initial={initial}
				animate={animate}
				transition={transition}
				className={className}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default AnimationWrapper;
