import styled from 'styled-components';

import TimeBlocks from './TimeBlocks';

interface TimeBlockSectionProps {
  plans: string[];
}

function TimeBlockSection(props: TimeBlockSectionProps) {
  const { plans } = props;
  return (
    <Styled.Root>
      {plans.map((el) => (
        <TimeBlocks key={el} />
      ))}
    </Styled.Root>
  );
}

export default TimeBlockSection;

const Styled = {
  Root: styled.div`
    display: flex;
    position: absolute;
    bottom: 4rem;
    flex-direction: column;
    gap: 1.2rem;
    margin-left: 0.75rem;
  `,
};
