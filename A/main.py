print("Input the number of test cases:")
t = int(input())
if t < 1 or t > 100:
    print("Invalid t")
    exit()

i = 1
for _ in range(t):
    print("Test " + str(i) + ":")
    print("Please enter two numbers with a space between them.")
    line = input().strip()
    parts = line.split()
    if len(parts) != 2:
        print("Invalid input")
        i += 1
        continue
    x, n = map(int, parts)
    print(x if n % 2 else 0)
    i += 1