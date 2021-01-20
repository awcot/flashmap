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

describe('the delete-node action', () => {
  fit('removes leaf nodes and their node data', () => {
    const { result } = renderHook(() => useTree())

    act(() => {
      result.current.actions.addNode(0)
    })

    const child = result.current.state.nodeData['1']
    expect(result.current.state.tree.children.length).toEqual(1)
    expect(typeof child).toEqual('object')

    act(() => {
      result.current.actions.deleteNode(child)
    })

    const childGone = result.current.state.nodeData['1']
    expect(result.current.state.tree.children.length).toEqual(0)
    expect(typeof childGone).toEqual('undefined')
  })
})
