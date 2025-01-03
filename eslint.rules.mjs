export const ts = {
  'quotes': ['warn', 'single'],
  'no-console': ['warn', { 'allow': ['error'] }],
  'no-debugger': ['warn'],
  'no-alert': ['warn'],
  'max-len': ['warn'],
  'no-extra-boolean-cast': ['warn'],
  'brace-style': ['warn', 'stroustrup', { 'allowSingleLine': true }],
  '@typescript-eslint/ban-types': ['off'],
  '@typescript-eslint/explicit-member-accessibility': [
    'warn',
    { 'overrides': { 'constructors': 'no-public' } }
  ],
  '@typescript-eslint/typedef': [
    'warn',
    {
      'parameter': true,
      'propertyDeclaration': true
    }
  ],
  '@typescript-eslint/no-explicit-any': ['off'],
  '@typescript-eslint/no-unsafe-call': ['warn'],
  '@typescript-eslint/no-unsafe-assignment': ['warn'],
  '@typescript-eslint/restrict-template-expressions': ['warn'],
  '@typescript-eslint/no-unsafe-member-access': ['warn'],
  '@typescript-eslint/no-unsafe-return': ['warn'],
  '@typescript-eslint/no-empty-function': ['warn'],
  '@typescript-eslint/no-floating-promises': ['warn'],
  '@typescript-eslint/no-misused-promises': [
    'warn',
    {
      'checksVoidReturn': true,
      'checksConditionals': true
    }
  ],
  '@typescript-eslint/explicit-function-return-type': 'warn'
};


