import {
  EN_CASE_DETAIL_SIZES,
  EN_CASE_PREVIEW_SIZES,
  type EnCaseImageConfig,
} from "@/lib/cases-en-image";

type Props = {
  image: EnCaseImageConfig;
  variant: "preview" | "detail";
  className?: string;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export function EnCaseStudyArt({
  image,
  variant,
  className = "en-case-study-art",
  sizes,
  loading,
  fetchPriority,
}: Props) {
  const frameClass = `${className}--${image.mediaFrame}`;
  const resolvedSizes =
    sizes ?? (variant === "detail" ? EN_CASE_DETAIL_SIZES : EN_CASE_PREVIEW_SIZES);
  const resolvedLoading = loading ?? (variant === "detail" ? "eager" : "lazy");
  const resolvedPriority =
    fetchPriority ?? (variant === "detail" ? "high" : "auto");

  return (
    <figure className={`${className} ${frameClass}`}>
      <picture>
        <source type="image/webp" srcSet={image.srcSet} sizes={resolvedSizes} />
        <img
          className="en-case-study-art__img"
          src={image.src}
          srcSet={image.srcSet}
          sizes={resolvedSizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={resolvedLoading}
          fetchPriority={resolvedPriority}
          decoding="async"
          style={
            image.objectPosition
              ? { objectPosition: image.objectPosition }
              : undefined
          }
        />
      </picture>
    </figure>
  );
}
