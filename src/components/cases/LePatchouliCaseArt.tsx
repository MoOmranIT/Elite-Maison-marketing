type Props = {
  className?: string;
  /** Slot width for `sizes`; defaults to preview column (~42% shell). */
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

const SRCSET = [
  "/assets/images/cases/le-patchouli-featured-384.webp 384w",
  "/assets/images/cases/le-patchouli-featured-512.webp 512w",
  "/assets/images/cases/le-patchouli-featured-768.webp 768w",
  "/assets/images/cases/le-patchouli-featured-1024.webp 1024w",
].join(", ");

const DEFAULT_SIZES_PREVIEW = "(max-width: 820px) min(100vw, 22rem), (min-width: 821px) min(42vw, 420px)";
const DEFAULT_SIZES_DETAIL = "(max-width: 820px) min(100vw, 22rem), (min-width: 821px) min(38vw, 380px)";

export function lePatchouliImageSizes(variant: "preview" | "detail" = "preview") {
  return variant === "detail" ? DEFAULT_SIZES_DETAIL : DEFAULT_SIZES_PREVIEW;
}

export function LePatchouliCaseArt({
  className = "le-patchouli-art",
  sizes = DEFAULT_SIZES_PREVIEW,
  loading = "lazy",
  fetchPriority = "auto",
}: Props) {
  return (
    <figure className={className}>
      <picture>
        <source type="image/webp" srcSet={SRCSET} sizes={sizes} />
        <img
          className={`${className}__img`}
          src="/assets/images/cases/le-patchouli-featured-1024.webp"
          srcSet={SRCSET}
          sizes={sizes}
          width={1024}
          height={1024}
          alt="Le Patchouli Café logo."
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
        />
      </picture>
    </figure>
  );
}
