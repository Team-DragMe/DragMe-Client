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
    top: 7rem;
    flex-direction: column;
    gap: 1.2rem;
    margin-left: 1.95rem;
    height: 42.8rem;
    overflow-y: scroll;
  `,
};
