import Select, {
    components,
    DropdownIndicatorProps,
    StylesConfig,
    ValueContainerProps,
    SingleValue,
} from 'react-select';
import React from 'react';

type OptionType = {
    value: string;
    label: string;
};

type CustomDropdownProps = {
    options: OptionType[];
    defaultValue?: OptionType;
    onChange?: (selected: OptionType | null) => void;
    isSearchable?: boolean;
    isDisabled?: boolean;
};

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => (
    <components.DropdownIndicator {...props}>
        <div
            style={{
                backgroundColor: '#FFC107',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                padding: '8px 12px',
                height: '100%',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginLeft: '-12px',
            }}
        >
            &darr;
        </div>
    </components.DropdownIndicator>
);

const ValueContainer = (props: ValueContainerProps<OptionType, false>) => {
    const selectedValue: SingleValue<OptionType> = props.getValue()[0];

    return (
        <components.ValueContainer {...props}>
            {selectedValue && (
                <div
                    style={{
                        backgroundColor: '#FFC107',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        color: 'black',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {selectedValue.label}
                </div>
            )}
        </components.ValueContainer>
    );
};

const customStyles: StylesConfig<OptionType, false> = {
    control: (base) => ({
        ...base,
        border: 'none',
        borderRadius: '6px',
        boxShadow: 'none',
        minHeight: 'unset',
        height: 'auto',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
        backgroundColor: 'transparent',
    }),
    singleValue: (base) => ({
        ...base,
        display: 'none',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '6px',
        backgroundColor: '#FFF8DC',
        overflow: 'hidden',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#FFC107'
            : state.isFocused
                ? '#FFECB3'
                : 'white',
        color: 'black',
        cursor: 'pointer',
        padding: '10px 15px',
    }),
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    defaultValue,
    onChange,
    isSearchable = false,
    isDisabled = false,
}) => {
    return (
        <Select<OptionType, false>
            options={options}
            defaultValue={defaultValue}
            styles={customStyles}
            components={{
                DropdownIndicator,
                ValueContainer,
            }}
            onChange={onChange}
            isSearchable={isSearchable}
            isDisabled={isDisabled}
        />
    );
};

export default CustomDropdown;
