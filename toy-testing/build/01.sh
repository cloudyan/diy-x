#

# In your terminal:
mkdir best-test-framework
cd best-test-framework
yarn init --yes
mkdir tests

echo "expect(1).toBe(2);" > tests/01.test.js
echo "expect(2).toBe(2);" > tests/02.test.js
echo "expect(3).toBe(4);" > tests/03.test.js
echo "expect(4).toBe(4);" > tests/04.test.js
echo "expect(5).toBe(6);" > tests/05.test.js
echo "expect(6).toBe(6);" > tests/06.test.js

touch index.mjs
pnpm i glob jest-haste-map
