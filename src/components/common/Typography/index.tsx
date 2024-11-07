import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  tag?: React.ElementType;
  size?: string; // Custom size classes
  color?: string; // Custom color classes
  weight?: string; // Custom font weight classes
  title?: string; // Tooltip text
}

const Typography: React.FC<TypographyProps> = ({
  tag: Tag = "p",
  children,
  className = "",
  size = "",
  color = "",
  weight = "",
  title = "",
  ...rest
}) => {
  // Combine classes into one string
  const classes = `${size} ${color} ${weight} ${className} text`.trim();

  return (
    React.createElement(Tag, { className: classes, title, ...rest }, children)
    // <Tag className={classes} title={title} {...rest}>
    //   {children}
    // </Tag>
  );
};

export default Typography;
