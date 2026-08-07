// Public surface.
//
// What ships from `@numeral/ui`:
//   - `cn` utility
//   - Layout primitives (Box, Stack/HStack/VStack, Flex, Grid, Container, Section)
//   - One canonical Button as a reference implementation of the hybrid pattern
//
// What does NOT ship: pre-built form controls, dialogs, dropdowns, etc.
// Add Radix primitives per project (`npm i @radix-ui/react-dialog`) and
// style them following the Button example.

export { cn } from './lib/cn';

export { Box } from './components/layout/Box';
export type { BoxProps } from './components/layout/Box';

export { Stack, HStack, VStack } from './components/layout/Stack';
export type { StackProps } from './components/layout/Stack';

export { Flex } from './components/layout/Flex';
export type { FlexProps } from './components/layout/Flex';

export { Grid } from './components/layout/Grid';
export type { GridProps } from './components/layout/Grid';

export { Container } from './components/layout/Container';
export type { ContainerProps } from './components/layout/Container';

export { Section } from './components/layout/Section';
export type { SectionProps } from './components/layout/Section';

export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';
