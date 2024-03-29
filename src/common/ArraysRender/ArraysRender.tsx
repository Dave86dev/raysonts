import React, { useState } from "react";
import { ArraysComponentProps } from "../../interfaces";
import { ObjectsRender } from "../ObjectsRender/ObjectsRender";
import { PrimitivesRender } from "../PrimitivesRender/PrimitivesRender";
import "./ArraysRender.css";

export const ArraysRender: React.FC<ArraysComponentProps> = ({
  keyName,
  value,
  depth = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const renderArrayItem = (item: any, index: number) => {
    const itemType = typeof item;
    if (itemType === "object" && item !== null) {
      return Array.isArray(item) ? (
        <div key={index}>
          <ArraysRender
            keyName={`Item ${index}`}
            value={item}
            depth={depth + 1}
          />
        </div>
      ) : (
        <div key={index}>
          <ObjectsRender keyName={""} value={item} depth={depth + 1} />
        </div>
      );
    } else {
      return (
        <div key={index}>
          <PrimitivesRender keyName={""} value={item} />
        </div>
      );
    }
  };

  return (
    <div className="arraysDesign">
      <div className="keyArray">
        <div className="keyNameValue">
          {keyName}: [{value.length}]
        </div>{" "}
        <div className="expanderDesign" onClick={toggleExpand}>{isExpanded ? "[-]" : "[+]"}</div>
      </div>
      {isExpanded && (
        <div style={{ marginLeft: `${depth === 0 ? 3 : (depth + 1) * 1}em` }}>
          {value.map((item, index) => renderArrayItem(item, index))}
        </div>
      )}
    </div>
  );
};
