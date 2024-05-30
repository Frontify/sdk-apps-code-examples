import { defineSettings } from '@frontify/platform-app';

/**
 * This file is where you can add settings to personalize the experience of the users.
 * These settings will appear in the app details of the marketplace after deploying,
 * publishing, and installing.
 *
 * For more information, please refer to the documentation:
 * https://developer.frontify.com/document/2258#/getting-started/app-development-1/app-settings
 */

/**
 * Section title: In this example, 'example1' will be the accordion header
 * for your settings in the marketplace. Within this section, we define
 * two different types of settings: a text input and a dropdown menu.
 *
 * Note: The `id` for each setting must be unique to ensure that the
 * appBridge can correctly save the setting values.
 */
export const settings = defineSettings({
    example1: [
        {
            type: 'input',
            id: 'single-line',
            label: 'Input field',
            defaultValue: 'Input Field Value',
        },
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'option1',
            size: 'large',
            disabled: true,
            choices: [
                {
                    value: 'option1',
                    label: 'Option 1',
                },
                {
                    value: 'option2',
                    label: 'Option 2',
                },
                {
                    value: 'option3',
                    label: 'Option 3',
                },
            ],
        },
    ],
    example2: [
        {
            type: 'input',
            id: 'input-password',
            inputType: 'password',
            label: 'Your password',
            defaultValue: 'AnyPassword',
        },
    ],
    example3: [
        {
            id: 'checklist-1',
            type: 'sectionHeading', // This will create a section heading within the accordion content
            label: 'Choose between those 2 options',
            blocks: [
                {
                    id: 'checklist-1',
                    type: 'checklist',
                    choices: [
                        {
                            id: 'checklist-1-option-1',
                            label: 'I am the first option',
                        },
                        {
                            id: 'checklist-1-option-2',
                            label: 'I am the second option',
                        },
                    ],
                },
            ],
        },
    ],
    example4: [
        {
            id: 'switch-1',
            type: 'sectionHeading',
            label: 'Turn on the switch',
            blocks: [
                {
                    id: 'switch-1-option-1',
                    type: 'switch',
                    switchLabel: 'Turn on switch',
                    size: 'medium',
                },
            ],
        },
    ],
});
