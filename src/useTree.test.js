import { renderHook, act } from '@testing-library/react-hooks'
import useTree from './useTree'

it('adds new nodes', () => {
  const { result } = renderHook(() => useTree())

  act(() => {
    result.current.actions.addNode(0)
    result.current.actions.addNode(0)
  })

  const { children } = result.current.state.tree
  expect(children.length).toBe(2)

  act(() => {
    result.current.actions.addNode(children[0].id)
  })

  const { children: grandchildren } = result.current.state.tree.children[0]
  expect(grandchildren.length).toEqual(1)
})

it('saves changes to existing nodes', () => {
  const { result } = renderHook(() => useTree())

  act(() => {
    result.current.actions.saveNode(0, { name: 'Root name' })
  })

  const data = Object.values(result.current.state.nodeData)[0]

  expect(data.name).toBe('Root name')
})
