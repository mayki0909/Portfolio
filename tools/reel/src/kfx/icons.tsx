import type { ReactNode } from "react";

/**
 * Lucide icons (ISC licence) that the KFX site uses, copied from lucide-react 0.468.0
 * in the krgofix project, so this project needs no icon package.
 */
type IconProps = {
  readonly size: number;
  readonly color: string;
  readonly strokeWidth?: number;
};

const Icon = ({
  size,
  color,
  strokeWidth = 2,
  children,
}: IconProps & { readonly children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}
  >
    {children}
  </svg>
);

/** `Clock10`, the "Hitra Obravnava" icon in servis-info-bar.tsx. */
export const ClockIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 8 10" />
  </Icon>
);

/** `Shield`, the "Garancija na Delo" icon in servis-info-bar.tsx. */
export const ShieldIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </Icon>
);

/** `CalendarFold`, the icon on the site's "Rezerviraj termin" buttons. */
export const CalendarFoldIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <path d="M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z" />
    <path d="M3 10h18" />
    <path d="M15 22v-4a2 2 0 0 1 2-2h4" />
  </Icon>
);

/** `Phone`, as in the site's navbar. */
export const PhoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
);

/** `Check`, drawn on from 0 to 1 by `progress`. */
export const CheckIcon = ({
  progress,
  ...props
}: IconProps & { readonly progress: number }) => (
  <Icon {...props}>
    <path
      d="M20 6 9 17l-5-5"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
  </Icon>
);

/** `MapPin`, as on the site's location cards. */
export const MapPinIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

/** `Lock`, for the address bar of the phone mockup. */
export const LockIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);

/** `Zap`, the charging bolt, filled. */
export const ZapIcon = ({ size, color }: Omit<IconProps, "strokeWidth">) => (
  <Icon size={size} color={color} strokeWidth={1.5}>
    <path
      fill={color}
      d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
    />
  </Icon>
);

/* Icons for the KFX posts, also from lucide-react 0.468.0 (ISC licence). */

/** `Snowflake`. */
export const SnowflakeIcon = (props: IconProps) => (
  <Icon {...props}>
    <line x1="2" x2="22" y1="12" y2="12" />
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="m20 16-4-4 4-4" />
    <path d="m4 8 4 4-4 4" />
    <path d="m16 4-4 4-4-4" />
    <path d="m8 20 4-4 4 4" />
  </Icon>
);

/** `House`. */
export const HouseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Icon>
);

/** `PlugZap`. */
export const PlugZapIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
    <path d="m2 22 3-3" />
    <path d="M7.5 13.5 10 11" />
    <path d="M10.5 16.5 13 14" />
    <path d="m18 3-4 4h6l-4 4" />
  </Icon>
);

/** `CalendarCheck`. */
export const CalendarCheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </Icon>
);

/** `Gauge`. */
export const GaugeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </Icon>
);

/** `Globe`. */
export const GlobeIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </Icon>
);

/** `Instagram`. */
export const InstagramIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Icon>
);

/** `Search`, for free diagnostics. */
export const SearchIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);

/** `Truck`, for pickup at the customer's address. */
export const TruckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </Icon>
);

/** `ArrowRight`. */
export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

/** `HardHat`, for the helmet rule. */
export const HelmetIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
    <path d="M14 6a6 6 0 0 1 6 6v3" />
    <path d="M4 15v-3a6 6 0 0 1 6-6" />
    <rect x="2" y="15" width="20" height="4" rx="1" />
  </Icon>
);

/** `Route`. */
export const RouteIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="6" cy="19" r="3" />
    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
    <circle cx="18" cy="5" r="3" />
  </Icon>
);

/** `Lightbulb`. */
export const LightbulbIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </Icon>
);

/** `UserX`, for "no passengers". */
export const UserXIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="17" x2="22" y1="8" y2="13" />
    <line x1="22" x2="17" y1="8" y2="13" />
  </Icon>
);

/** `Smartphone`. */
export const SmartphoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </Icon>
);

/** `BookOpen`, for the manual. */
export const BookOpenIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </Icon>
);

/** `Disc`, a brake disc. */
export const DiscIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="2" />
  </Icon>
);

/** `Gift`. */
export const GiftIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </Icon>
);

/** `Package`, for an order. */
export const PackageIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
    <path d="M12 22V12" />
    <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7" />
    <path d="m7.5 4.27 9 5.15" />
  </Icon>
);
