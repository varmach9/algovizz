import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId,title }) => (
  <div className="video-responsive" >
    <iframe
      width="300"
      height="200"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
    <h4>{title}</h4>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;