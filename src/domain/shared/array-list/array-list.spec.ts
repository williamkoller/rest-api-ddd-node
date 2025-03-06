import { ArrayList } from './array-list';

class NumberArrayList extends ArrayList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe(ArrayList.name, () => {
  let ArrayList: NumberArrayList;

  beforeEach(() => {
    ArrayList = new NumberArrayList([1, 2, 3]);
  });

  it('should initialize with given items', () => {
    expect(ArrayList.getItems()).toEqual([1, 2, 3]);
    expect(ArrayList.getNewItems()).toEqual([]);
    expect(ArrayList.getRemovedItems()).toEqual([]);
  });

  it('should add new items correctly', () => {
    ArrayList.add(4);
    expect(ArrayList.getItems()).toContain(4);
    expect(ArrayList.getNewItems()).toContain(4);
  });

  it('should not add duplicate items', () => {
    ArrayList.add(1);
    expect(ArrayList.getItems().filter((item) => item === 1).length).toBe(1);
    expect(ArrayList.getNewItems()).not.toContain(1);
  });

  it('should remove items correctly', () => {
    ArrayList.remove(2);
    expect(ArrayList.getItems()).not.toContain(2);
    expect(ArrayList.getRemovedItems()).toContain(2);
  });

  it('should handle re-adding removed items', () => {
    ArrayList.remove(2);
    ArrayList.add(2);
    expect(ArrayList.getRemovedItems()).not.toContain(2);
    expect(ArrayList.getItems()).toContain(2);
  });

  it('should return correct size', () => {
    expect(ArrayList.size()).toBe(3);
    ArrayList.add(4);
    expect(ArrayList.size()).toBe(4);
    ArrayList.remove(1);
    expect(ArrayList.size()).toBe(3);
  });

  it('should identify empty list', () => {
    ArrayList = new NumberArrayList();
    expect(ArrayList.isEmpty()).toBe(true);
  });

  it('should sort items', () => {
    ArrayList = new NumberArrayList([3, 2, 1]);
    ArrayList.sort();
    expect(ArrayList.getItems()).toEqual([1, 2, 3]);
  });

  it('should check item existence', () => {
    expect(ArrayList.exists(2)).toBe(true);
    expect(ArrayList.exists(4)).toBe(false);
  });

  it('should return new items correctly', () => {
    ArrayList.add(5);
    expect(ArrayList.getNewItems()).toEqual([5]);
  });

  it('should remove item from new items list', () => {
    ArrayList.add(6);
    expect(ArrayList.getNewItems()).toContain(6);
    ArrayList.remove(6);
    expect(ArrayList.getNewItems()).not.toContain(6);
  });

  it('should not add initial items to new items list', () => {
    ArrayList.add(1);
    expect(ArrayList.getNewItems()).not.toContain(1);
  });

  it('should return an empty new items list initially', () => {
    expect(ArrayList.getNewItems()).toEqual([]);
  });

  it('should keep items order when compareItems returns true', () => {
    class CustomArrayList extends NumberArrayList {
      compareItems(a: number, b: number): boolean {
        return true;
      }
    }

    const list = new CustomArrayList([3, 2, 1]);
    list.sort();
    expect(list.getItems()).toEqual([3, 2, 1]);
  });

  it('should sort items in ascending order', () => {
    const list = new NumberArrayList([3, 1, 2]);
    list.sort();
    expect(list.getItems()).toEqual([1, 2, 3]);
  });

  it('should sort items correctly when values are reversed', () => {
    const list = new NumberArrayList([5, 10]);
    list.sort();
    expect(list.getItems()).toEqual([5, 10]);
  });
});
