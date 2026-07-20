type ArrowIconProps = {
  direction?: "down" | "up" | "left" | "up-right";
  size?: number;
};

const rotations = {
  down: 0,
  up: 180,
  left: 90,
  "up-right": 225,
};

export const ArrowIcon = ({
  direction = "up-right",
  size = 18,
}: ArrowIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={{ transform: `rotate(${rotations[direction]}deg)` }}
  >
    <path
      d="M12 3V21M17 16L12 21L7 16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
