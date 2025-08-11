import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const CustomizedButtonGroup = ({ options = [], selected, onChange }) => {
    return (
        <ButtonGroup style={{ marginBottom: '20px' }}>
            {options.map((type) => (
                <Button
                    key={type}
                    onClick={() => onChange(type)}
                    style={{
                        backgroundColor: selected === type ? '#147b82' : '#ffffff',
                        color: selected === type ? '#ffffff' : '#000000',
                        border: '1px solid #147b82',
                        textTransform: 'capitalize',
                    }}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default CustomizedButtonGroup;
