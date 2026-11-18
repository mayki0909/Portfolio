import {
  AbsoluteFill,
  Img,
  Interactive,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand } from "../brand";
import { SceneTitle } from "./SceneTitle";

type Product = {
  readonly name: string;
  readonly src: string;
  /** Image size and the bounding box of the product inside it (transparent PNGs from the site's shop section). */
  readonly size: readonly [number, number];
  readonly box: readonly [number, number, number, number];
  /** Where the product's centre lands on the 1080×1920 canvas, and how tall it is there. */
  readonly centre: readonly [number, number];
  readonly height: number;
  readonly delay: number;
};

const PRODUCTS: readonly Product[] = [
  {
    name: "Case",
    src: "home/shop-case.png",
    size: [540, 540],
    box: [170, 80, 371, 462],
    centre: [360, 1260],
    height: 640,
    delay: 8,
  },
  {
    name: "Charger",
    src: "home/shop-glass.png",
    size: [1630, 1080],
    box: [324, 171, 1306, 910],
    centre: [770, 905],
    height: 330,
    delay: 14,
  },
  {
    name: "Cable",
    src: "home/shop-cable.png",
    size: [1630, 1080],
    box: [385, 132, 1301, 923],
    centre: [770, 1430],
    height: 380,
    delay: 20,
  },
];

const ProductShot = ({ product }: { readonly product: Product }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [width, height] = product.size;
  const [x0, y0, x1, y1] = product.box;
  const scale = product.height / (y1 - y0);
  const pop = spring({
    frame: frame - product.delay,
    fps,
    config: { damping: 12, stiffness: 170, mass: 0.7 },
  });
  // A slow bob once it has landed, offset per product so they do not move in step.
  const float = Math.sin(((frame - product.delay) / fps) * Math.PI) * 8;

  return (
    <Interactive.Div
      name={product.name}
      style={{
        position: "absolute",
        left: product.centre[0] - ((x0 + x1) / 2) * scale,
        top: product.centre[1] - ((y0 + y1) / 2) * scale,
        width: width * scale,
        height: height * scale,
        opacity: interpolate(
          frame,
          [product.delay, product.delay + 8],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
        scale: String(0.7 + 0.3 * pop),
        translate: `0px ${(1 - pop) * 60 + float}px`,
      }}
    >
      <Img
        src={staticFile(product.src)}
        style={{ width: "100%", height: "100%" }}
      />
    </Interactive.Div>
  );
};

/** "Nakup ovitkov in dodatkov.": a case, a charger and a cable pop in under the title. */
export const Accessories = () => (
  <AbsoluteFill style={{ backgroundColor: brand.white }}>
    <SceneTitle lines={["Nakup", "ovitkov", "in dodatkov."]} />
    {PRODUCTS.map((product) => (
      <ProductShot key={product.name} product={product} />
    ))}
  </AbsoluteFill>
);
