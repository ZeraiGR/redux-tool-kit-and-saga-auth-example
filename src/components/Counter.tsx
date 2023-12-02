import { Button } from '@gravity-ui/uikit'

interface CounterProps {
    value: number
    onIncrement: () => void
    onDecrement: () => void
    onIncrementAsync: () => void
}

export const Counter = ({
    value,
    onIncrement,
    onDecrement,
    onIncrementAsync,
}: CounterProps) => (
    <div>
        <Button onClick={onIncrementAsync}>Increment after 1 second</Button>{' '}
        <Button onClick={onIncrement}>Increment</Button>{' '}
        <Button onClick={onDecrement}>Decrement</Button>
        <hr />
        <div>Clicked: {value} times</div>
    </div>
)
