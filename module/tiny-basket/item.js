import React from 'react';
import styled, { keyframes } from 'styled-components';

import { animationSpeedMs } from '../helpers';

const animationItemHighlight = keyframes`
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(0.97);
    }
    75% {
      transform: scale(0.93);
    }
    100% {
      transform: scale(1);
    }
  `;

const Item = styled.li.attrs({
  className: 'crystallize-basket__item'
})`
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: 0;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  position: relative;
  ${p =>
    p.animate &&
    `
    animation: ${animationItemHighlight} ${animationSpeedMs}ms 1;
  `};
`;

const ItemInfo = styled.span.attrs({
  className: 'crystallize-basket__item-info'
})`
  display: flex;
  align-items: center;
`;

const ItemInfoText = styled.div.attrs({
  className: 'crystallize-basket__item-info-text'
})``;

const ItemImage = styled.img.attrs({
  className: 'crystallize-basket__item-image'
})`
  width: 50px;
  margin-right: 10px;
`;

const ItemName = styled.div.attrs({
  className: 'crystallize-basket__item-name'
})``;

const ItemQuantityChanger = styled.span.attrs({
  className: 'crystallize-basket__item-quantity-changer'
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemQuantity = styled.span.attrs({
  className: 'crystallize-basket__item-quantity'
})`
  display: inline-block;
  margin: 0 3px;
  min-width: 23px;
  text-align: center;
`;

const ItemDelete = styled.button.attrs({
  className: 'crystallize-basket__item-delete'
})`
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 0px;

  &:before {
    content: '+';
    display: block;
    transform: rotate(45deg);
    font-size: 12px;
  }
`;

const Attributes = styled.div.attrs({
  className: 'crystallize-basket__item-attributes'
})`
  margin-top: 5px;
  font-size: 0.8rem;
`;
const Attribute = styled.div.attrs({
  className: 'crystallize-basket__item-attribute'
})``;

const Price = styled.div.attrs({
  className: 'crystallize-basket__item-price'
})`
  margin-top: 5px;
`;

export default class TinyBasketItem extends React.Component {
  state = {};
  render() {
    const { item, actions, t } = this.props;
    const { attributes } = item;
    return (
      <Item animate={item.animate}>
        <ItemInfo>
          <ItemImage src={item.product_image_resized} alt={item.name} />
          <ItemInfoText>
            <ItemName>{item.name}</ItemName>
            {attributes &&
              attributes.length > 0 && (
                <Attributes>
                  {attributes.map(a => (
                    <Attribute key={a.attribute_key}>
                      {a.attribute_key}: {a.attribute_value}
                    </Attribute>
                  ))}
                </Attributes>
              )}
            <Price>{item.unit_price},-</Price>
          </ItemInfoText>
        </ItemInfo>
        <ItemQuantityChanger>
          <button onClick={() => actions.decrementQuantityItem(item)}>-</button>
          <ItemQuantity>{item.quantity}</ItemQuantity>
          <button onClick={() => actions.incrementQuantityItem(item)}>+</button>
        </ItemQuantityChanger>
        <ItemDelete onClick={() => actions.removeItem(item)}>
          {t('basket:removeItemFromBasket', item)}
        </ItemDelete>
      </Item>
    );
  }
}
