import React from "react";
import Icon from "antd/lib/icon";

/**
 * Show NoData component when there is no book under current filter selection
 */
const Nodata = () => (
  <div className="no-data-wrapper">
    <h2 className="no-data">
      <Icon type="info-circle" />
      &nbsp;&nbsp;No Book Under Current Selection
    </h2>
  </div>
);

export default Nodata;
