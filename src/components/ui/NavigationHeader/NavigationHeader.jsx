import "./NavigationHeader.css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import IconButton from "../Button/IconButton";

function NavigationHeader({
  title,

  onPrevious,

  onNext,

  hidePrevious = false,

  hideNext = false,
}) {
  return (
    <section className="navigation-header">
      <h1>{title}</h1>

      <div className="navigation-header-actions">
        {!hidePrevious && (
          <IconButton variant="secondary" title="Previous" onClick={onPrevious}>
            <ChevronLeft />
          </IconButton>
        )}

        {!hideNext && (
          <IconButton variant="secondary" title="Next" onClick={onNext}>
            <ChevronRight />
          </IconButton>
        )}
      </div>
    </section>
  );
}

export default NavigationHeader;
