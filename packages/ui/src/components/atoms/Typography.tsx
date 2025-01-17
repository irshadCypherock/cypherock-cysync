import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import {
  spacing,
  SpacingProps,
  font,
  FontProps,
  width,
  WidthProps,
  position,
  PositionProps,
  display,
  DisplayProps,
} from '../utils';

interface HeadingProps
  extends SpacingProps,
    FontProps,
    WidthProps,
    PositionProps,
    DisplayProps {
  color?:
    | 'gold'
    | 'silver'
    | 'error'
    | 'success'
    | 'heading'
    | 'muted'
    | 'list';
  $textAlign?: 'center' | 'left' | 'right';
}

const baseStyle = css<HeadingProps>`
  ${props =>
    props.color === 'gold' &&
    css`
      background: ${({ theme }) => theme.palette.golden};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    `}

  ${props =>
    props.color === 'silver' &&
    css`
      background: ${({ theme }) => theme.palette.secondary.secondary};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    `}

${props =>
    props.color === 'error' &&
    css`
      color: ${({ theme }) => theme.palette.warning.main};
    `}

  
${props =>
    props.color === 'success' &&
    css`
      color: ${({ theme }) => theme.palette.success.main};
    `}

  ${props => props.color && `color: ${props.theme.palette.text[props.color]};`}

  ${props => props.$textAlign && `text-align: ${props.$textAlign};`}

  max-width: 100%;
`;

const HeadingOneStyle = styled.h1<HeadingProps>`
  font-size: 40px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;

const HeadingTwoStyle = styled.h2<HeadingProps>`
  font-size: 32px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;

const HeadingThreeStyle = styled.h3<HeadingProps>`
  font-size: 28px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${width};
  ${position};
  ${display};
`;

const HeadingFourStyle = styled.h4<HeadingProps>`
  font-size: 24px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;

const HeadingFiveStyle = styled.h5<HeadingProps>`
  font-size: 20px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;

const HeadingSixStyle = styled.h6<HeadingProps>`
  font-size: 16px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;

const SpanStyle = styled.span<HeadingProps>`
  font-size: 16px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;
const FinePrintStyle = styled.span<HeadingProps>`
  font-size: 14px;
  font-weight: 300;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;

const PStyle = styled.p<HeadingProps>`
  font-size: 16px;
  font-weight: 400;
  ${baseStyle};
  ${spacing};
  ${font};
  ${width};
  ${position};
  ${display};
`;

interface TypographyProps extends HeadingProps {
  children?: ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'fineprint';
}

export const Typography = ({
  variant,
  children,
  ...props
}: TypographyProps) => {
  switch (variant) {
    case 'h1':
      return <HeadingOneStyle {...props}>{children}</HeadingOneStyle>;
    case 'h2':
      return <HeadingTwoStyle {...props}>{children}</HeadingTwoStyle>;
    case 'h3':
      return <HeadingThreeStyle {...props}>{children}</HeadingThreeStyle>;
    case 'h4':
      return <HeadingFourStyle {...props}>{children}</HeadingFourStyle>;
    case 'h5':
      return <HeadingFiveStyle {...props}>{children}</HeadingFiveStyle>;
    case 'h6':
      return <HeadingSixStyle {...props}>{children}</HeadingSixStyle>;
    case 'span':
      return <SpanStyle {...props}>{children}</SpanStyle>;
    case 'fineprint':
      return <FinePrintStyle {...props}>{children}</FinePrintStyle>;

    case 'p':
    default:
      return <PStyle {...props}>{children}</PStyle>;
  }
};

Typography.defaultProps = {
  variant: 'p',
  children: null,
  color: 'heading',
  $textAlign: 'left',
};
