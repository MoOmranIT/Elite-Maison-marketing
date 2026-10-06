import { useState, type FocusEvent } from "react";
import { useI18n } from "@/context/language";

const BRAND_IN_TITLE = "Elite Maison";

export function ExecutionDeliveryFlip() {
  const { copy } = useI18n();
  const [deliveryFlipped, setDeliveryFlipped] = useState(false);

  const deliveryTitleFull = copy("execution", "deliveryTitle");
  const deliveryDescription = copy("execution", "deliveryDescription");
  const brandIndex = deliveryTitleFull.indexOf(BRAND_IN_TITLE);
  const deliveryTitleLead = brandIndex >= 0 ? deliveryTitleFull.slice(0, brandIndex).trim() : deliveryTitleFull;
  const deliveryTitleTrail =
    brandIndex >= 0 ? deliveryTitleFull.slice(brandIndex + BRAND_IN_TITLE.length).trim() : "";

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDeliveryFlipped(false);
    }
  };

  return (
    <section className="execution-delivery-band" aria-labelledby="execution-delivery-title">
      <div className="shell execution-delivery-band__shell">
        <aside
          className={`execution-delivery${deliveryFlipped ? " is-flipped" : ""}`}
          tabIndex={0}
          role="group"
          aria-labelledby="execution-delivery-title"
          aria-describedby="execution-delivery-body"
          onPointerUp={(event) => {
            if (event.pointerType === "touch") setDeliveryFlipped((value) => !value);
          }}
          onBlur={onBlur}
        >
          <h2 id="execution-delivery-title" className="sr-only">
            {deliveryTitleFull}
          </h2>
          <p id="execution-delivery-body" className="sr-only">
            {deliveryDescription}
          </p>

          <div className="execution-delivery__stage" aria-hidden="true">
            <div className="execution-delivery__plane">
              <div className="execution-delivery__face execution-delivery__face--front">
                <div className="execution-delivery__surface execution-delivery__surface--front">
                  <p className="execution-delivery__eyebrow kicker">{copy("execution", "deliveryEyebrow")}</p>
                  <div className="execution-delivery__headline" aria-hidden="true">
                    <span className="execution-delivery__headline-lead">{deliveryTitleLead}</span>
                    {brandIndex >= 0 ? (
                      <span className="execution-delivery__brand-row">
                        <img
                          className="execution-delivery__brand-mark"
                          src="/assets/images/logo-mark.png"
                          alt=""
                          decoding="async"
                        />
                        <span className="execution-delivery__brand-name">{BRAND_IN_TITLE}</span>
                      </span>
                    ) : null}
                    {deliveryTitleTrail ? (
                      <span className="execution-delivery__headline-trail">{deliveryTitleTrail}</span>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="execution-delivery__face execution-delivery__face--back">
                <div className="execution-delivery__surface execution-delivery__surface--back">
                  <p className="execution-delivery__description">{deliveryDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
