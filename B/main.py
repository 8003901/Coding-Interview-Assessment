print("Input the number of test cases:")
try:
    t = int(input())
except ValueError:
    print("Invalid t")
    exit()

if t < 1 or t > 1000:
    print("Invalid t")
    exit()

for i in range(1, t + 1):
    print(f"Test {i}:")
    print("Please enter the total number of propulsion units:")
    try:
        n = int(input())
    except ValueError:
        print("Invalid input")
        continue

    if n < 1 or n > 10**18:
        print("Invalid input")
        continue

    if n & 1 or n == 2:
        print(-1)
        continue

    m = n // 2
    max_crafts = m // 2
    b_max = m // 3
    if (b_max & 1) != (m & 1):
        b_max -= 1
    min_crafts = (m - b_max) // 2
    print(min_crafts, max_crafts)
