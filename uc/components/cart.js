import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useState } from 'react';

const CartIconWithBadge = ({itemCount}) => {
   // Example: use state for dynamic count

  return (
    <IconButton aria-label="cart">
      <Badge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon className="text-orange-500" />
      </Badge>
    </IconButton>
  );
};

export default CartIconWithBadge;
