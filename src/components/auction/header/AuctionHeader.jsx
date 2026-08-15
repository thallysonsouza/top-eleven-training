import "./AuctionHeader.css";

import { useLocation, useNavigate } from "react-router-dom";

import { ChevronLeft, ChevronRight, Gavel } from "lucide-react";

import IconButton from "../../ui/Button/IconButton";

function AuctionHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const basePath = "/app/auction";

  const pages = [
    {
      path: basePath,
      title: "Auction Simulator",
    },
    {
      path: `${basePath}/manual`,
      title: "Manual Auction Analyzer",
    },
    {
      path: `${basePath}/smart`,
      title: "Smart Auction Analyzer",
    },
  ];

  const currentIndex = pages.findIndex(
    (page) => page.path === location.pathname,
  );

  const currentPage = currentIndex >= 0 ? pages[currentIndex] : pages[0];

  const canGoPrevious = currentIndex > 0;

  const canGoNext = currentIndex >= 0 && currentIndex < pages.length - 1;

  function handlePrevious() {
    if (!canGoPrevious) {
      return;
    }

    navigate(pages[currentIndex - 1].path);
  }

  function handleNext() {
    if (!canGoNext) {
      return;
    }

    navigate(pages[currentIndex + 1].path);
  }

  return (
    <section className="auction-header">
      <div className="auction-header-title">
        <Gavel size={26} />

        <h1>{currentPage.title}</h1>
      </div>

      <div className="auction-header-navigation">
        <IconButton
          variant="secondary"
          title="Previous"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
        >
          <ChevronLeft size={18} />
        </IconButton>

        <IconButton
          variant="secondary"
          title="Next"
          onClick={handleNext}
          disabled={!canGoNext}
        >
          <ChevronRight size={18} />
        </IconButton>
      </div>
    </section>
  );
}

export default AuctionHeader;
