import React, { useState } from "react";
import "./ObjectsRender.css";
import { ObjectsComponentProps } from "../../interfaces";
import { ArraysRender } from "../ArraysRender/ArraysRender";
import { PrimitivesRender } from "../PrimitivesRender/PrimitivesRender";

export const ObjectsRender: React.FC<ObjectsComponentProps> = ({
  keyName,
  value,
  depth = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="keyObject">
      <div className="expanderKeyValue">
        <div className="keyName">{keyName !== "" ? `${keyName}` : "{}"}:</div>{" "}
        <div className="expanderDesign" onClick={toggleExpand}>
          {isExpanded ? "[-]" : "[+]"}
        </div>
      </div>
      {isExpanded && (
        <div>
          {Object.entries(value).map(([nestedKey, nestedValue]) => {
            const isObject =
              nestedValue !== null &&
              typeof nestedValue === "object" &&
              !Array.isArray(nestedValue);
            const isArray = Array.isArray(nestedValue);
            return (
              <div
                key={nestedKey}
                style={{ marginLeft: `${(depth + 1) * 1}em` }}
              >
                {isArray ? (
                  <ArraysRender
                    keyName={nestedKey}
                    value={nestedValue}
                    depth={depth + 1}
                  />
                ) : isObject ? (
                  <ObjectsRender
                    keyName={nestedKey}
                    value={nestedValue}
                    depth={depth + 1}
                  />
                ) : (
                  <PrimitivesRender keyName={nestedKey} value={nestedValue} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
