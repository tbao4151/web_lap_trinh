import type { Problem, Submission } from '@/types';

export const SEED_PROBLEMS: Problem[] = [
  {
    id: 'prob-1',
    code: 'P001',
    slug: 'tong-hai-so',
    title: 'Tổng hai số nguyên lớn 64-bit',
    domainId: 'lap-trinh',
    difficulty: 'beginner',
    goals: ['zero-to-hero', 'high-school'],
    tags: ['Nhập xuất', 'Kiểu dữ liệu', 'Cơ bản'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho hai số nguyên A và B có giá trị tuyệt đối lên tới 10^15. Hãy tính và in ra tổng A + B.\n\nBài toán giúp bạn kiểm tra cách chọn kiểu dữ liệu số nguyên 64-bit (long long trong C/C++, long trong Java, int tự mở rộng trong Python) để tránh tràn số 32-bit.',
    inputFormat: 'Một dòng duy nhất chứa hai số nguyên A và B cách nhau bởi một khoảng trắng.',
    outputFormat: 'Một số nguyên duy nhất là giá trị của A + B.',
    constraints: ['-10^15 <= A, B <= 10^15'],
    samples: [
      {
        input: '125000000000 375000000000',
        output: '500000000000',
        explanation: 'Hai số vượt giới hạn kiểu int 32-bit (~2.14 * 10^9) nên cần kiểu 64-bit.',
      },
      {
        input: '-42 100',
        output: '58',
      },
    ],
    notes: 'Nếu dùng kiểu int 32-bit trong C/C++ hoặc Java, chương trình sẽ bị tràn số ở nhóm test lớn.',
    hints: [
      'Gợi ý mức 1: Kiểu int chuẩn trong C/C++/Java chỉ lưu được tới khoảng 2 * 10^9.',
      'Gợi ý mức 2: Sử dụng long long trong C/C++ (định dạng %lld trong C) hoặc long trong Java.',
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) == 2) {
        printf("%lld\\n", a + b);
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << a + b << "\\n";
    }
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if len(data) >= 2:
        a, b = int(data[0]), int(data[1])
        print(a + b)

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            long a = sc.nextLong();
            long b = sc.nextLong();
            System.out.println(a + b);
        }
    }
}`,
    },
    testGroups: [
      { id: 'tg-1', name: 'Subtask 1: Số nhỏ 32-bit', points: 50, constraintsNote: '|A|, |B| <= 10^6', testcaseCount: 5 },
      { id: 'tg-2', name: 'Subtask 2: Số lớn 64-bit', points: 50, constraintsNote: '|A|, |B| <= 10^15', testcaseCount: 5 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-2',
    code: 'P002',
    slug: 'tong-phan-tu-mang',
    title: 'Tổng phần tử mảng một chiều',
    domainId: 'lap-trinh',
    difficulty: 'beginner',
    goals: ['zero-to-hero', 'high-school'],
    tags: ['Mảng 1 chiều', 'Vòng lặp', 'Cơ bản'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho mảng gồm N số nguyên a_1, a_2, ..., a_N. Hãy tính tổng tất cả các phần tử trong mảng.',
    inputFormat:
      'Dòng đầu tiên chứa số nguyên dương N. Dòng thứ hai chứa N số nguyên a_1, a_2, ..., a_N cách nhau bởi khoảng trắng.',
    outputFormat: 'Một số nguyên duy nhất là tổng các phần tử của mảng.',
    constraints: ['1 <= N <= 200,000', '-10^9 <= a_i <= 10^9'],
    samples: [
      {
        input: '5\n4 9 2 15 7',
        output: '37',
        explanation: '4 + 9 + 2 + 15 + 7 = 37.',
      },
    ],
    hints: [
      'Gợi ý mức 1: Tổng tối đa có thể đạt 200,000 * 10^9 = 2 * 10^14, cần biến cộng dồn 64-bit.',
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long sum = 0;
    for (int i = 0; i < n; ++i) {
        long long x;
        scanf("%lld", &x);
        sum += x;
    }
    printf("%lld\\n", sum);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    if (!(cin >> n)) return 0;
    long long sum = 0;
    for (int i = 0; i < n; ++i) {
        long long x;
        cin >> x;
        sum += x;
    }
    cout << sum << "\\n";
    return 0;
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    n = int(tokens[0])
    nums = (int(x) for x in tokens[1:n+1])
    print(sum(nums))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long sum = 0;
        for (int i = 0; i < n; i++) {
            sum += sc.nextLong();
        }
        System.out.println(sum);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p2-1', name: 'Subtask 1: N <= 1,000', points: 40, constraintsNote: '|a_i| <= 1,000', testcaseCount: 4 },
      { id: 'tg-p2-2', name: 'Subtask 2: N <= 200,000', points: 60, constraintsNote: '|a_i| <= 10^9', testcaseCount: 6 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-3',
    code: 'P003',
    slug: 'dem-so-chan',
    title: 'Đếm số chẵn và tổng các số chẵn trong dãy',
    domainId: 'lap-trinh',
    difficulty: 'beginner',
    goals: ['zero-to-hero', 'high-school'],
    tags: ['Vòng lặp', 'Điều kiện', 'Mảng 1 chiều'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho dãy gồm N số nguyên. Hãy đếm xem trong dãy có bao nhiêu số chẵn và tính tổng của các số chẵn đó (lưu ý số âm chia hết cho 2 vẫn là số chẵn).',
    inputFormat: 'Dòng 1 chứa số nguyên dương N. Dòng 2 chứa N số nguyên.',
    outputFormat: 'In trên một dòng hai số nguyên: số lượng số chẵn và tổng các số chẵn, cách nhau bởi 1 khoảng trắng.',
    constraints: ['1 <= N <= 100,000', '-10^9 <= a_i <= 10^9'],
    samples: [
      {
        input: '6\n3 -4 8 11 0 6',
        output: '4 10',
        explanation: 'Các số chẵn là -4, 8, 0, 6 (có 4 số). Tổng = -4 + 8 + 0 + 6 = 10.',
      },
    ],
    hints: [
      'Gợi ý mức 1: Dùng phép chia lấy dư x % 2 == 0 để kiểm tra tính chẵn cả cho số âm và số dương.',
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n, count = 0;
    long long sum = 0;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; ++i) {
        long long x;
        scanf("%lld", &x);
        if (x % 2 == 0) {
            count++;
            sum += x;
        }
    }
    printf("%d %lld\\n", count, sum);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n, count = 0;
    long long sum = 0;
    if (!(cin >> n)) return 0;
    for (int i = 0; i < n; ++i) {
        long long x;
        cin >> x;
        if (x % 2 == 0) {
            count++;
            sum += x;
        }
    }
    cout << count << " " << sum << "\\n";
    return 0;
}`,
      python: `import sys

def main():
    tokens = [int(x) for x in sys.stdin.read().split()]
    if not tokens:
        return
    n = tokens[0]
    evens = [x for x in tokens[1:n+1] if x % 2 == 0]
    print(len(evens), sum(evens))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int count = 0;
        long sum = 0;
        for (int i = 0; i < n; i++) {
            long x = sc.nextLong();
            if (x % 2 == 0) {
                count++;
                sum += x;
            }
        }
        System.out.println(count + " " + sum);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p3-1', name: 'Subtask 1: Tất cả số không âm', points: 50, constraintsNote: '0 <= a_i <= 10^6', testcaseCount: 5 },
      { id: 'tg-p3-2', name: 'Subtask 2: Có số âm và số 0', points: 50, constraintsNote: '-10^9 <= a_i <= 10^9', testcaseCount: 5 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-4',
    code: 'P004',
    slug: 'tim-max',
    title: 'Tìm giá trị lớn nhất và vị trí xuất hiện đầu tiên',
    domainId: 'lap-trinh',
    difficulty: 'beginner',
    goals: ['zero-to-hero', 'high-school'],
    tags: ['Mảng 1 chiều', 'Vét cạn', 'Cơ bản'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho mảng gồm N số nguyên (đánh chỉ số từ 1 đến N). Hãy tìm giá trị lớn nhất trong mảng và chỉ số xuất hiện đầu tiên của giá trị đó.',
    inputFormat: 'Dòng 1 chứa số nguyên dương N. Dòng 2 chứa N số nguyên a_1, a_2, ..., a_N.',
    outputFormat: 'In ra giá trị lớn nhất và chỉ số đầu tiên (1-indexed) cách nhau bởi một khoảng trắng.',
    constraints: ['1 <= N <= 100,000', '-10^9 <= a_i <= 10^9'],
    samples: [
      {
        input: '6\n-5 12 4 12 9 -1',
        output: '12 2',
        explanation: 'Giá trị lớn nhất là 12, xuất hiện lần đầu ở vị trí thứ 2.',
      },
    ],
    hints: [
      'Gợi ý mức 1: Đừng khởi tạo maxVal = 0 vì toàn bộ mảng có thể đều là số âm! Hãy khởi tạo maxVal = a[1].',
      'Gợi ý mức 2: Để giữ vị trí xuất hiện đầu tiên, chỉ cập nhật khi a[i] > maxVal (không dùng dấu >=).',
    ],
    starterCode: {
      c: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long maxVal;
    scanf("%lld", &maxVal);
    int bestIdx = 1;
    for (int i = 2; i <= n; ++i) {
        long long x;
        scanf("%lld", &x);
        if (x > maxVal) {
            maxVal = x;
            bestIdx = i;
        }
    }
    printf("%lld %d\\n", maxVal, bestIdx);
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    long long maxVal;
    cin >> maxVal;
    int bestIdx = 1;
    for (int i = 2; i <= n; ++i) {
        long long x;
        cin >> x;
        if (x > maxVal) {
            maxVal = x;
            bestIdx = i;
        }
    }
    cout << maxVal << " " << bestIdx << "\\n";
    return 0;
}`,
      python: `import sys

def main():
    tokens = [int(x) for x in sys.stdin.read().split()]
    if not tokens:
        return
    n = tokens[0]
    arr = tokens[1:n+1]
    max_val = arr[0]
    best_idx = 1
    for i, x in enumerate(arr[1:], start=2):
        if x > max_val:
            max_val = x
            best_idx = i
    print(max_val, best_idx)

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        long maxVal = sc.nextLong();
        int bestIdx = 1;
        for (int i = 2; i <= n; i++) {
            long x = sc.nextLong();
            if (x > maxVal) {
                maxVal = x;
                bestIdx = i;
            }
        }
        System.out.println(maxVal + " " + bestIdx);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p4-1', name: 'Subtask 1: Mảng dương', points: 50, constraintsNote: 'a_i > 0', testcaseCount: 5 },
      { id: 'tg-p4-2', name: 'Subtask 2: Mảng toàn số âm & trùng max', points: 50, constraintsNote: '-10^9 <= a_i < 0', testcaseCount: 5 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-5',
    code: 'P005',
    slug: 'so-nguyen-to',
    title: 'Kiểm tra số nguyên tố trong O(sqrt(N))',
    domainId: 'thuat-toan-hsg',
    difficulty: 'beginner',
    goals: ['high-school', 'competitive'],
    tags: ['Số học', 'Số nguyên tố', 'Toán học'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho số nguyên N. Hãy kiểm tra xem N có phải là số nguyên tố hay không. Số nguyên tố là số nguyên lớn hơn 1 và chỉ có đúng hai ước nguyên dương là 1 và chính nó.',
    inputFormat: 'Một dòng chứa số nguyên N.',
    outputFormat: 'In ra YES nếu N là số nguyên tố, ngược lại in ra NO.',
    constraints: ['-10^9 <= N <= 10^12'],
    samples: [
      { input: '29', output: 'YES', explanation: '29 chỉ chia hết cho 1 và 29.' },
      { input: '1', output: 'NO', explanation: 'Số 1 không phải là số nguyên tố.' },
    ],
    hints: [
      'Gợi ý mức 1: Nếu N có ước lớn hơn sqrt(N) thì chắc chắn có ước tương ứng nhỏ hơn hoặc bằng sqrt(N).',
      'Gợi ý mức 2: Kiểm tra ước d từ 2 với điều kiện 1LL * d * d <= N.',
    ],
    starterCode: {
      c: `#include <stdio.h>

int isPrime(long long n) {
    if (n < 2) return 0;
    for (long long d = 2; d * d <= n; ++d) {
        if (n % d == 0) return 0;
    }
    return 1;
}

int main(void) {
    long long n;
    if (scanf("%lld", &n) == 1) {
        printf("%s\\n", isPrime(n) ? "YES" : "NO");
    }
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

bool isPrime(long long n) {
    if (n < 2) return false;
    for (long long d = 2; d * d <= n; ++d) {
        if (n % d == 0) return false;
    }
    return true;
}

int main() {
    long long n;
    if (cin >> n) {
        cout << (isPrime(n) ? "YES" : "NO") << "\\n";
    }
    return 0;
}`,
      python: `import sys

def is_prime(n: int) -> bool:
    if n < 2:
        return False
    d = 2
    while d * d <= n:
        if n % d == 0:
            return False
        d += 1
    return True

def main():
    data = sys.stdin.read().split()
    if data:
        print("YES" if is_prime(int(data[0])) else "NO")

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    static boolean isPrime(long n) {
        if (n < 2) return false;
        for (long d = 2; d * d <= n; d++) {
            if (n % d == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (sc.hasNextLong()) {
            System.out.println(isPrime(sc.nextLong()) ? "YES" : "NO");
        }
    }
}`,
    },
    testGroups: [
      { id: 'tg-p5-1', name: 'Subtask 1: N <= 10^6', points: 50, constraintsNote: 'Duyệt O(N) vẫn chạy kịp', testcaseCount: 5 },
      { id: 'tg-p5-2', name: 'Subtask 2: N <= 10^12', points: 50, constraintsNote: 'Bắt buộc O(sqrt(N))', testcaseCount: 5 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-6',
    code: 'P006',
    slug: 'tim-kiem-nhi-phan',
    title: 'Tìm kiếm nhị phân cổ điển trên mảng sắp xếp',
    domainId: 'thuat-toan-hsg',
    difficulty: 'intermediate',
    goals: ['high-school', 'competitive', 'career-cs'],
    tags: ['Tìm kiếm nhị phân', 'Mảng sắp xếp', 'Chia để trị'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho mảng A gồm N số nguyên đã được sắp xếp tăng dần nghiêm ngặt và Q truy vấn. Mỗi truy vấn cho một số nguyên X, hãy tìm vị trí (đánh số từ 1 đến N) của X trong mảng A, hoặc in ra -1 nếu X không xuất hiện.',
    inputFormat:
      'Dòng 1 chứa hai số nguyên dương N và Q.\nDòng 2 chứa N số nguyên tăng dần A_1 < A_2 < ... < A_N.\nQ dòng tiếp theo, mỗi dòng chứa một số nguyên X.',
    outputFormat: 'Ứng với mỗi truy vấn, in ra chỉ số (1-indexed) hoặc -1 trên một dòng.',
    constraints: ['1 <= N, Q <= 100,000', '-10^9 <= A_i, X <= 10^9'],
    samples: [
      {
        input: '5 3\n2 5 8 14 20\n8\n15\n2',
        output: '3\n-1\n1',
        explanation: '8 nằm ở vị trí 3; 15 không có trong mảng; 2 nằm ở vị trí 1.',
      },
    ],
    hints: [
      'Gợi ý mức 1: Tìm kiếm tuần tự O(N * Q) sẽ tốn 10^10 phép toán và bị TLE.',
      'Gợi ý mức 2: Dùng tìm kiếm nhị phân O(log N) cho mỗi truy vấn, tổng độ phức tạp O((N + Q) log N).',
    ],
    starterCode: {
      c: `#include <stdio.h>

int a[100005];

int binarySearch(int n, int x) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (a[mid] == x) return mid + 1;
        if (a[mid] < x) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}

int main(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    for (int i = 0; i < n; ++i) scanf("%d", &a[i]);
    while (q--) {
        int x;
        scanf("%d", &x);
        printf("%d\\n", binarySearch(n, x));
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<int> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];

    while (q--) {
        int x;
        cin >> x;
        int l = 0, r = n - 1, ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (a[mid] == x) {
                ans = mid + 1;
                break;
            }
            if (a[mid] < x) l = mid + 1;
            else r = mid - 1;
        }
        cout << ans << "\\n";
    }
    return 0;
}`,
      python: `import sys
from bisect import bisect_left

def main():
    data = [int(x) for x in sys.stdin.read().split()]
    if not data:
        return
    n, q = data[0], data[1]
    a = data[2:2+n]
    queries = data[2+n:2+n+q]
    out = []
    for x in queries:
        idx = bisect_left(a, x)
        if idx < n and a[idx] == x:
            out.append(str(idx + 1))
        else:
            out.append("-1")
    print("\\n".join(out))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int q = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int x = sc.nextInt();
            int pos = Arrays.binarySearch(a, x);
            sb.append(pos >= 0 ? (pos + 1) : -1).append("\\n");
        }
        System.out.print(sb);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p6-1', name: 'Subtask 1: N, Q <= 1,000', points: 40, constraintsNote: 'Cho phép O(N*Q)', testcaseCount: 4 },
      { id: 'tg-p6-2', name: 'Subtask 2: N, Q <= 100,000', points: 60, constraintsNote: 'Yêu cầu O(Q log N)', testcaseCount: 6 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-7',
    code: 'P007',
    slug: 'prefix-sum',
    title: 'Truy vấn tổng đoạn con với Mảng cộng dồn (Prefix Sum)',
    domainId: 'thuat-toan-hsg',
    difficulty: 'intermediate',
    goals: ['high-school', 'competitive'],
    tags: ['Prefix Sum', 'Mảng cộng dồn', 'Truy vấn đoạn'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho mảng A gồm N số nguyên (đánh chỉ số từ 1 đến N) và Q truy vấn. Mỗi truy vấn gồm hai số nguyên L, R (1 <= L <= R <= N), yêu cầu tính tổng các phần tử A_L + A_{L+1} + ... + A_R.',
    inputFormat:
      'Dòng 1 chứa N và Q.\nDòng 2 chứa N số nguyên A_1, A_2, ..., A_N.\nQ dòng tiếp theo, mỗi dòng chứa hai số nguyên L và R.',
    outputFormat: 'Gồm Q dòng, mỗi dòng là tổng đoạn [L, R] tương ứng.',
    constraints: ['1 <= N, Q <= 200,000', '-10^9 <= A_i <= 10^9'],
    samples: [
      {
        input: '5 3\n3 1 4 1 5\n1 3\n2 5\n4 4',
        output: '8\n11\n1',
        explanation: 'Đoạn [1, 3] = 3 + 1 + 4 = 8; đoạn [2, 5] = 1 + 4 + 1 + 5 = 11.',
      },
    ],
    hints: [
      'Gợi ý mức 1: Xây dựng mảng pref[i] = A_1 + A_2 + ... + A_i với pref[0] = 0.',
      'Gợi ý mức 2: Tổng đoạn [L, R] được tính trong O(1) bằng công thức pref[R] - pref[L - 1].',
    ],
    starterCode: {
      c: `#include <stdio.h>

long long pref[200005];

int main(void) {
    int n, q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    pref[0] = 0;
    for (int i = 1; i <= n; ++i) {
        long long x;
        scanf("%lld", &x);
        pref[i] = pref[i - 1] + x;
    }
    while (q--) {
        int l, r;
        scanf("%d %d", &l, &r);
        printf("%lld\\n", pref[r] - pref[l - 1]);
    }
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
        long long x;
        cin >> x;
        pref[i] = pref[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << pref[r] - pref[l - 1] << "\\n";
    }
    return 0;
}`,
      python: `import sys

def main():
    data = [int(x) for x in sys.stdin.read().split()]
    if not data:
        return
    n, q = data[0], data[1]
    pref = [0] * (n + 1)
    for i in range(1, n + 1):
        pref[i] = pref[i - 1] + data[1 + i]
    idx = 2 + n
    out = []
    for _ in range(q):
        l, r = data[idx], data[idx + 1]
        idx += 2
        out.append(str(pref[r] - pref[l - 1]))
    print("\\n".join(out))

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int q = sc.nextInt();
        long[] pref = new long[n + 1];
        for (int i = 1; i <= n; i++) {
            pref[i] = pref[i - 1] + sc.nextLong();
        }
        StringBuilder sb = new StringBuilder();
        while (q-- > 0) {
            int l = sc.nextInt();
            int r = sc.nextInt();
            sb.append(pref[r] - pref[l - 1]).append("\\n");
        }
        System.out.print(sb);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p7-1', name: 'Subtask 1: N, Q <= 2,000', points: 40, constraintsNote: 'Vòng lặp O(N*Q) đạt điểm', testcaseCount: 4 },
      { id: 'tg-p7-2', name: 'Subtask 2: N, Q <= 200,000', points: 60, constraintsNote: 'Yêu cầu Prefix Sum O(N + Q)', testcaseCount: 6 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-8',
    code: 'P008',
    slug: 'day-con-tang',
    title: 'Dãy con tăng dài nhất (Longest Increasing Subsequence)',
    domainId: 'thuat-toan-hsg',
    difficulty: 'intermediate',
    goals: ['competitive', 'high-school', 'career-cs'],
    tags: ['Quy hoạch động', 'DP 1 chiều', 'Tìm kiếm nhị phân'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho dãy A gồm N số nguyên. Một dãy con của A là dãy thu được bằng cách xóa đi một số phần tử (hoặc không xóa phần tử nào) và giữ nguyên thứ tự các phần tử còn lại. Hãy tìm độ dài của dãy con tăng nghiêm ngặt dài nhất.',
    inputFormat: 'Dòng 1 chứa số nguyên dương N.\nDòng 2 chứa N số nguyên A_1, A_2, ..., A_N.',
    outputFormat: 'Một số nguyên duy nhất là độ dài dãy con tăng dài nhất.',
    constraints: ['1 <= N <= 5,000 (Subtask 1) và N <= 100,000 (Subtask 2)', '-10^9 <= A_i <= 10^9'],
    samples: [
      {
        input: '6\n10 9 2 5 3 7',
        output: '3',
        explanation: 'Dãy con tăng dài nhất là [2, 5, 7] hoặc [2, 3, 7] có độ dài 3.',
      },
    ],
    hints: [
      'Gợi ý mức 1 (O(N^2)): Gọi dp[i] là độ dài dãy con tăng dài nhất kết thúc tại A[i]. Khi đó dp[i] = max(dp[j] + 1) với mọi j < i mà A[j] < A[i].',
      'Gợi ý mức 2 (O(N log N)): Duy trì mảng tail[k] là giá trị kết thúc nhỏ nhất của dãy con tăng độ dài k + 1 và dùng tìm kiếm nhị phân.',
    ],
    starterCode: {
      c: `#include <stdio.h>

int a[5005], dp[5005];

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; ++i) scanf("%d", &a[i]);
    int ans = 0;
    for (int i = 0; i < n; ++i) {
        dp[i] = 1;
        for (int j = 0; j < i; ++j) {
            if (a[j] < a[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > ans) ans = dp[i];
    }
    printf("%d\\n", ans);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n), dp(n, 1);
    for (int i = 0; i < n; ++i) cin >> a[i];

    int ans = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < i; ++j) {
            if (a[j] < a[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        ans = max(ans, dp[i]);
    }
    cout << ans << "\\n";
    return 0;
}`,
      python: `import sys

def main():
    data = [int(x) for x in sys.stdin.read().split()]
    if not data:
        return
    n = data[0]
    a = data[1:n+1]
    dp = [1] * n
    for i in range(n):
        for j in range(i):
            if a[j] < a[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
    print(max(dp) if dp else 0)

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int[] a = new int[n];
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        Arrays.fill(dp, 1);
        int ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (a[j] < a[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            ans = Math.max(ans, dp[i]);
        }
        System.out.println(ans);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p8-1', name: 'Subtask 1: N <= 5,000', points: 60, constraintsNote: 'DP O(N^2)', testcaseCount: 6 },
      { id: 'tg-p8-2', name: 'Subtask 2: N <= 100,000', points: 40, constraintsNote: 'DP + Binary Search O(N log N)', testcaseCount: 4 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-9',
    code: 'P009',
    slug: 'doi-tien-it-nhat',
    title: 'Đổi tiền với số đồng xu ít nhất (Coin Change)',
    domainId: 'thuat-toan-hsg',
    difficulty: 'intermediate',
    goals: ['competitive', 'high-school', 'career-cs'],
    tags: ['Quy hoạch động', 'DP 1 chiều', 'Tối ưu hóa'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho hệ thống gồm N mệnh giá đồng xu dương c_1, c_2, ..., c_N và tổng tiền mục tiêu S. Mỗi mệnh giá có thể sử dụng không giới hạn số lần. Hãy tìm số lượng đồng xu ít nhất để tạo thành tổng đúng bằng S, hoặc in ra -1 nếu không thể đổi được.',
    inputFormat:
      'Dòng 1 chứa hai số nguyên dương N và S.\nDòng 2 chứa N số nguyên dương c_1, c_2, ..., c_N.',
    outputFormat: 'Một số nguyên duy nhất là số đồng xu ít nhất, hoặc -1 nếu bất khả thi.',
    constraints: ['1 <= N <= 100', '1 <= S <= 10,000', '1 <= c_i <= 10,000'],
    samples: [
      {
        input: '3 6\n1 3 4',
        output: '2',
        explanation: 'Dùng hai đồng mệnh giá 3 (3 + 3 = 6). Cách tham lam 4 + 1 + 1 dùng tới 3 đồng xu.',
      },
      {
        input: '2 7\n2 4',
        output: '-1',
        explanation: 'Hai đồng xu chẵn 2 và 4 không thể tạo ra tổng lẻ 7.',
      },
    ],
    notes: 'Đây là bài tập thực hành trực tiếp của bài học "Quy hoạch động một chiều: Bài toán Đổi tiền".',
    hints: [
      'Gợi ý mức 1: Khởi tạo dp[0] = 0 và dp[1..S] = INF (ví dụ 10^9).',
      'Gợi ý mức 2: Với mỗi tổng s từ 1 đến S và mỗi coin, nếu s >= coin và dp[s - coin] != INF thì cập nhật dp[s] = min(dp[s], dp[s - coin] + 1).',
    ],
    starterCode: {
      c: `#include <stdio.h>

#define INF 1000000000

int coins[105], dp[10005];

int main(void) {
    int n, S;
    if (scanf("%d %d", &n, &S) != 2) return 0;
    for (int i = 0; i < n; ++i) scanf("%d", &coins[i]);

    dp[0] = 0;
    for (int s = 1; s <= S; ++s) dp[s] = INF;

    for (int s = 1; s <= S; ++s) {
        for (int i = 0; i < n; ++i) {
            int c = coins[i];
            if (s >= c && dp[s - c] != INF) {
                if (dp[s - c] + 1 < dp[s]) {
                    dp[s] = dp[s - c] + 1;
                }
            }
        }
    }

    printf("%d\\n", dp[S] == INF ? -1 : dp[S]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int INF = 1e9;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n, S;
    if (!(cin >> n >> S)) return 0;
    vector<int> coins(n);
    for (int i = 0; i < n; ++i) cin >> coins[i];

    vector<int> dp(S + 1, INF);
    dp[0] = 0;

    for (int s = 1; s <= S; ++s) {
        for (int c : coins) {
            if (s >= c && dp[s - c] != INF) {
                dp[s] = min(dp[s], dp[s - c] + 1);
            }
        }
    }

    cout << (dp[S] == INF ? -1 : dp[S]) << "\\n";
    return 0;
}`,
      python: `import sys

INF = 10**9

def main():
    data = [int(x) for x in sys.stdin.read().split()]
    if not data:
        return
    n, S = data[0], data[1]
    coins = data[2:2+n]

    dp = [INF] * (S + 1)
    dp[0] = 0

    for s in range(1, S + 1):
        for c in coins:
            if s >= c and dp[s - c] != INF:
                if dp[s - c] + 1 < dp[s]:
                    dp[s] = dp[s - c] + 1

    print(-1 if dp[S] == INF else dp[S])

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    static final int INF = 1_000_000_000;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int S = sc.nextInt();
        int[] coins = new int[n];
        for (int i = 0; i < n; i++) coins[i] = sc.nextInt();

        int[] dp = new int[S + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;

        for (int s = 1; s <= S; s++) {
            for (int c : coins) {
                if (s >= c && dp[s - c] != INF) {
                    dp[s] = Math.min(dp[s], dp[s - c] + 1);
                }
            }
        }

        System.out.println(dp[S] == INF ? -1 : dp[S]);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p9-1', name: 'Subtask 1: Luôn có đồng xu 1', points: 40, constraintsNote: 'Mọi tổng đều khả thi', testcaseCount: 4 },
      { id: 'tg-p9-2', name: 'Subtask 2: Phản ví dụ Tham lam & Trạng thái INF', points: 60, constraintsNote: 'Có trường hợp kết quả -1', testcaseCount: 6 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-10',
    code: 'P010',
    slug: 'leo-cau-thang',
    title: 'Đếm số cách leo cầu thang (Modulo 10^9 + 7)',
    domainId: 'thuat-toan-hsg',
    difficulty: 'beginner',
    goals: ['high-school', 'competitive'],
    tags: ['Quy hoạch động', 'DP 1 chiều', 'Số học Modulo'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Một cầu thang có N bậc. Mỗi bước bạn có thể bước lên 1 bậc hoặc 2 bậc. Hãy đếm số cách khác nhau để bước từ chân cầu thang (bậc 0) lên tới bậc thứ N. Vì kết quả có thể rất lớn, hãy in ra phần dư của kết quả khi chia cho 1,000,000,007.',
    inputFormat: 'Một số nguyên dương N.',
    outputFormat: 'Số cách leo lên bậc N chia lấy dư cho 10^9 + 7.',
    constraints: ['1 <= N <= 100,000'],
    samples: [
      {
        input: '4',
        output: '5',
        explanation: '5 cách là: (1+1+1+1), (1+1+2), (1+2+1), (2+1+1), (2+2).',
      },
    ],
    hints: [
      'Gợi ý mức 1: Để đứng ở bậc i, bước cuối cùng chỉ có thể xuất phát từ bậc i - 1 hoặc bậc i - 2.',
      'Gợi ý mức 2: dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007.',
    ],
    starterCode: {
      c: `#include <stdio.h>

#define MOD 1000000007

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    long long a = 1, b = 1;
    for (int i = 2; i <= n; ++i) {
        long long c = (a + b) % MOD;
        a = b;
        b = c;
    }
    printf("%lld\\n", b);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

const int MOD = 1e9 + 7;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> dp(n + 1, 0);
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; ++i) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
    }
    cout << dp[n] << "\\n";
    return 0;
}`,
      python: `import sys

MOD = 10**9 + 7

def main():
    data = sys.stdin.read().split()
    if not data:
        return
    n = int(data[0])
    a, b = 1, 1
    for _ in range(2, n + 1):
        a, b = b, (a + b) % MOD
    print(b)

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    static final int MOD = 1_000_000_007;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int a = 1, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = (a + b) % MOD;
            a = b;
            b = c;
        }
        System.out.println(b);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p10-1', name: 'Subtask 1: N <= 30', points: 40, constraintsNote: 'Không tràn 32-bit', testcaseCount: 4 },
      { id: 'tg-p10-2', name: 'Subtask 2: N <= 100,000', points: 60, constraintsNote: 'Yêu cầu chia dư MOD ở mỗi bước', testcaseCount: 6 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-11',
    code: 'P011',
    slug: 'balo-0-1',
    title: 'Bài toán cái túi 0/1 (0/1 Knapsack)',
    domainId: 'thuat-toan-hsg',
    difficulty: 'advanced',
    goals: ['competitive', 'career-cs'],
    tags: ['Quy hoạch động', 'DP 2 chiều', 'Balo Knapsack'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Có N đồ vật, đồ vật thứ i có trọng lượng w_i và giá trị v_i. Bạn mang theo một chiếc túi có tải trọng tối đa W. Mỗi đồ vật chỉ được chọn tối đa 1 lần. Hãy tìm tổng giá trị lớn nhất của các đồ vật có thể xếp vào túi sao cho tổng trọng lượng không vượt quá W.',
    inputFormat:
      'Dòng 1 chứa hai số nguyên dương N và W.\nN dòng tiếp theo, dòng thứ i chứa hai số nguyên dương w_i và v_i.',
    outputFormat: 'Một số nguyên duy nhất là tổng giá trị lớn nhất đạt được.',
    constraints: ['1 <= N <= 100', '1 <= W <= 10,000', '1 <= w_i <= W', '1 <= v_i <= 10^9'],
    samples: [
      {
        input: '3 7\n3 30\n4 50\n5 60',
        output: '80',
        explanation: 'Chọn vật 1 (nặng 3, giá trị 30) và vật 2 (nặng 4, giá trị 50) có tổng nặng 7 <= 7 và tổng giá trị 80.',
      },
    ],
    hints: [
      'Gợi ý mức 1: Vì v_i lên tới 10^9 nên tổng giá trị có thể vượt kiểu int 32-bit, cần mảng dp kiểu 64-bit (long long).',
      'Gợi ý mức 2: Duyệt từng đồ vật và cập nhật w lùi từ W về w_i: dp[w] = max(dp[w], dp[w - w_i] + v_i).',
    ],
    starterCode: {
      c: `#include <stdio.h>

long long dp[10005];

int main(void) {
    int n, W;
    if (scanf("%d %d", &n, &W) != 2) return 0;
    for (int i = 0; i < n; ++i) {
        int w;
        long long v;
        scanf("%d %lld", &w, &v);
        for (int cap = W; cap >= w; --cap) {
            if (dp[cap - w] + v > dp[cap]) {
                dp[cap] = dp[cap - w] + v;
            }
        }
    }
    printf("%lld\\n", dp[W]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, W;
    if (!(cin >> n >> W)) return 0;
    vector<long long> dp(W + 1, 0);
    for (int i = 0; i < n; ++i) {
        int w;
        long long v;
        cin >> w >> v;
        for (int cap = W; cap >= w; --cap) {
            dp[cap] = max(dp[cap], dp[cap - w] + v);
        }
    }
    cout << dp[W] << "\\n";
    return 0;
}`,
      python: `import sys

def main():
    data = [int(x) for x in sys.stdin.read().split()]
    if not data:
        return
    n, W = data[0], data[1]
    dp = [0] * (W + 1)
    idx = 2
    for _ in range(n):
        w, v = data[idx], data[idx + 1]
        idx += 2
        for cap in range(W, w - 1, -1):
            if dp[cap - w] + v > dp[cap]:
                dp[cap] = dp[cap - w] + v
    print(dp[W])

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        int W = sc.nextInt();
        long[] dp = new long[W + 1];
        for (int i = 0; i < n; i++) {
            int w = sc.nextInt();
            long v = sc.nextLong();
            for (int cap = W; cap >= w; cap--) {
                dp[cap] = Math.max(dp[cap], dp[cap - w] + v);
            }
        }
        System.out.println(dp[W]);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p11-1', name: 'Subtask 1: N <= 20, W <= 1,000', points: 40, constraintsNote: 'Nhánh cận hoặc DP 2D', testcaseCount: 4 },
      { id: 'tg-p11-2', name: 'Subtask 2: N <= 100, W <= 10,000', points: 60, constraintsNote: 'DP O(N*W) với kiểu 64-bit', testcaseCount: 6 },
    ],
    visibility: 'public',
  },
  {
    id: 'prob-12',
    code: 'P012',
    slug: 'duong-di-tren-bang',
    title: 'Đường đi có tổng lớn nhất trên lưới ô vuông',
    domainId: 'thuat-toan-hsg',
    difficulty: 'competition',
    goals: ['competitive', 'high-school'],
    tags: ['Quy hoạch động', 'DP 2 chiều', 'Bảng lưới'],
    supportedLanguages: ['c', 'cpp', 'python', 'java'],
    timeLimitMs: 1000,
    memoryLimitMb: 256,
    statement:
      'Cho bảng lưới kích thước M hàng, N cột. Ô ở hàng i, cột j chứa số nguyên A[i][j]. Xuất phát từ ô góc trên trái (1, 1), mỗi bước chỉ được đi sang phải (i, j + 1) hoặc đi xuống dưới (i + 1, j) cho tới khi đến ô góc dưới phải (M, N). Hãy tìm tổng giá trị lớn nhất trên đường đi.',
    inputFormat:
      'Dòng 1 chứa hai số nguyên dương M và N.\nM dòng tiếp theo, mỗi dòng chứa N số nguyên A[i][j].',
    outputFormat: 'Một số nguyên duy nhất là tổng lớn nhất từ (1, 1) đến (M, N).',
    constraints: ['1 <= M, N <= 1,000', '-10^6 <= A[i][j] <= 10^6'],
    samples: [
      {
        input: '3 3\n1 3 1\n1 5 1\n4 2 1',
        output: '12',
        explanation: 'Đường đi tối ưu: (1,1)=1 -> (1,2)=3 -> (2,2)=5 -> (3,2)=2 -> (3,3)=1, tổng bằng 12.',
      },
    ],
    hints: [
      'Gợi ý mức 1: Ô (i, j) chỉ có thể đi tới từ (i - 1, j) hoặc (i, j - 1).',
      'Gợi ý mức 2: Cẩn thận khi khởi tạo hàng 0 và cột 0 bằng -INF vì A[i][j] có thể âm!',
    ],
    starterCode: {
      c: `#include <stdio.h>

long long dp[1005][1005];

int main(void) {
    int m, n;
    if (scanf("%d %d", &m, &n) != 2) return 0;
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            long long val;
            scanf("%lld", &val);
            if (i == 1 && j == 1) dp[i][j] = val;
            else if (i == 1) dp[i][j] = dp[i][j - 1] + val;
            else if (j == 1) dp[i][j] = dp[i - 1][j] + val;
            else {
                long long best = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
                dp[i][j] = best + val;
            }
        }
    }
    printf("%lld\\n", dp[m][n]);
    return 0;
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const long long NEG_INF = -1e18;

int main() {
    int m, n;
    if (!(cin >> m >> n)) return 0;
    vector<vector<long long>> dp(m + 1, vector<long long>(n + 1, NEG_INF));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            long long val;
            cin >> val;
            if (i == 1 && j == 1) dp[i][j] = val;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + val;
        }
    }
    cout << dp[m][n] << "\\n";
    return 0;
}`,
      python: `import sys

NEG_INF = -10**18

def main():
    data = [int(x) for x in sys.stdin.read().split()]
    if not data:
        return
    m, n = data[0], data[1]
    dp = [[NEG_INF] * (n + 1) for _ in range(m + 1)]
    idx = 2
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            val = data[idx]
            idx += 1
            if i == 1 and j == 1:
                dp[i][j] = val
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]) + val
    print(dp[m][n])

if __name__ == "__main__":
    main()`,
      java: `import java.util.Scanner;
import java.util.Arrays;

public class Main {
    static final long NEG_INF = -(long) 1e18;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int m = sc.nextInt();
        int n = sc.nextInt();
        long[][] dp = new long[m + 1][n + 1];
        for (long[] row : dp) Arrays.fill(row, NEG_INF);
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                long val = sc.nextLong();
                if (i == 1 && j == 1) dp[i][j] = val;
                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + val;
            }
        }
        System.out.println(dp[m][n]);
    }
}`,
    },
    testGroups: [
      { id: 'tg-p12-1', name: 'Subtask 1: M, N <= 10, A[i][j] >= 0', points: 40, constraintsNote: 'Đệ quy quay lui đạt điểm', testcaseCount: 4 },
      { id: 'tg-p12-2', name: 'Subtask 2: M, N <= 1,000, có số âm', points: 60, constraintsNote: 'DP 2 chiều O(M*N)', testcaseCount: 6 },
    ],
    visibility: 'public',
  },
];

export const SEED_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-demo-ac-coin',
    problemId: 'prob-9',
    problemSlug: 'doi-tien-it-nhat',
    problemTitle: 'Đổi tiền với số đồng xu ít nhất (Coin Change)',
    userId: 'usr-learner-1',
    userName: 'Nguyễn Minh Khôi',
    classroomId: 'cls-hsg-11',
    language: 'cpp',
    status: 'AC',
    isDemo: true,
    submittedAt: '2026-11-11 20:15:00',
    runtimeMs: 14,
    memoryKb: 3840,
    score: 100,
    maxScore: 100,
    sourceCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int INF = 1e9;

int main() {
    int n, S;
    if (!(cin >> n >> S)) return 0;
    vector<int> coins(n);
    for (int i = 0; i < n; ++i) cin >> coins[i];

    vector<int> dp(S + 1, INF);
    dp[0] = 0;

    for (int s = 1; s <= S; ++s) {
        for (int c : coins) {
            if (s >= c && dp[s - c] != INF) {
                dp[s] = min(dp[s], dp[s - c] + 1);
            }
        }
    }

    cout << (dp[S] == INF ? -1 : dp[S]) << "\\n";
    return 0;
}`,
    testGroupResults: [
      {
        groupId: 'tg-p9-1',
        groupName: 'Subtask 1: Luôn có đồng xu 1',
        status: 'AC',
        passedCount: 4,
        totalCount: 4,
        score: 40,
        maxScore: 40,
        runtimeMs: 5,
        memoryKb: 3600,
        sampleNote: 'Đúng tất cả các test cơ bản, bao gồm S = 6 với bộ xu [1, 3, 4] trả về 2.',
      },
      {
        groupId: 'tg-p9-2',
        groupName: 'Subtask 2: Phản ví dụ Tham lam & Trạng thái INF',
        status: 'AC',
        passedCount: 6,
        totalCount: 6,
        score: 60,
        maxScore: 60,
        runtimeMs: 14,
        memoryKb: 3840,
        sampleNote: 'Xử lý chính xác các trạng thái không thể đổi được (in -1) và không bị tràn số INF + 1.',
      },
    ],
  },
  {
    id: 'sub-demo-wa-coin',
    problemId: 'prob-9',
    problemSlug: 'doi-tien-it-nhat',
    problemTitle: 'Đổi tiền với số đồng xu ít nhất (Coin Change)',
    userId: 'usr-learner-1',
    userName: 'Nguyễn Minh Khôi',
    classroomId: 'cls-hsg-11',
    language: 'python',
    status: 'WA',
    isDemo: true,
    submittedAt: '2026-11-11 19:50:00',
    runtimeMs: 42,
    memoryKb: 9200,
    score: 20,
    maxScore: 100,
    sourceCode: `# Thuật toán tham lam (chưa đúng với bộ xu [1, 3, 4] và S = 6)
import sys

data = [int(x) for x in sys.stdin.read().split()]
n, S = data[0], data[1]
coins = sorted(data[2:2+n], reverse=True)
ans = 0
for c in coins:
    ans += S // c
    S %= c
print(ans if S == 0 else -1)`,
    testGroupResults: [
      {
        groupId: 'tg-p9-1',
        groupName: 'Subtask 1: Luôn có đồng xu 1',
        status: 'WA',
        passedCount: 2,
        totalCount: 4,
        score: 20,
        maxScore: 40,
        runtimeMs: 18,
        memoryKb: 9100,
        sampleNote: 'Sai ở Test #2 (Xu [1, 3, 4], S = 6): Output ra 3 (4+1+1), đáp án chuẩn là 2 (3+3).',
      },
      {
        groupId: 'tg-p9-2',
        groupName: 'Subtask 2: Phản ví dụ Tham lam & Trạng thái INF',
        status: 'WA',
        passedCount: 0,
        totalCount: 6,
        score: 0,
        maxScore: 60,
        runtimeMs: 42,
        memoryKb: 9200,
        sampleNote: 'Chiến lược Tham lam bỏ sót phương án kết hợp các mệnh giá trung gian.',
      },
    ],
  },
  {
    id: 'sub-demo-tle-bsearch',
    problemId: 'prob-6',
    problemSlug: 'tim-kiem-nhi-phan',
    problemTitle: 'Tìm kiếm nhị phân cổ điển trên mảng sắp xếp',
    userId: 'usr-learner-1',
    userName: 'Nguyễn Minh Khôi',
    classroomId: 'cls-hsg-11',
    language: 'cpp',
    status: 'TLE',
    isDemo: true,
    submittedAt: '2026-11-10 21:10:00',
    runtimeMs: 1000,
    memoryKb: 4200,
    score: 40,
    maxScore: 100,
    sourceCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n);
    for (int i = 0; i < n; ++i) cin >> a[i];
    // Duyệt tuyến tính O(N) cho mỗi truy vấn -> Tổng O(N * Q) quá thời gian ở Subtask 2
    while (q--) {
        int x, pos = -1;
        cin >> x;
        for (int i = 0; i < n; ++i) {
            if (a[i] == x) { pos = i + 1; break; }
        }
        cout << pos << "\\n";
    }
    return 0;
}`,
    testGroupResults: [
      {
        groupId: 'tg-p6-1',
        groupName: 'Subtask 1: N, Q <= 1,000',
        status: 'AC',
        passedCount: 4,
        totalCount: 4,
        score: 40,
        maxScore: 40,
        runtimeMs: 12,
        memoryKb: 4100,
        sampleNote: 'Đạt điểm Subtask nhỏ với N, Q <= 1,000.',
      },
      {
        groupId: 'tg-p6-2',
        groupName: 'Subtask 2: N, Q <= 100,000',
        status: 'TLE',
        passedCount: 0,
        totalCount: 6,
        score: 0,
        maxScore: 60,
        runtimeMs: 1000,
        memoryKb: 4200,
        sampleNote: 'Vượt quá giới hạn 1000 ms do độ phức tạp O(N * Q) ~ 10^10 bước lặp.',
      },
    ],
  },
  {
    id: 'sub-demo-ce-java',
    problemId: 'prob-1',
    problemSlug: 'tong-hai-so',
    problemTitle: 'Tổng hai số nguyên lớn 64-bit',
    userId: 'usr-learner-1',
    userName: 'Nguyễn Minh Khôi',
    language: 'java',
    status: 'CE',
    isDemo: true,
    submittedAt: '2026-11-09 16:40:00',
    score: 0,
    maxScore: 100,
    compilerMessage: `Main.java:8: error: ';' expected
        System.out.println(a + b)
                                 ^
1 error`,
    sourceCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(a + b)
    }
}`,
    testGroupResults: [],
  },
  {
    id: 'sub-demo-ac-sum',
    problemId: 'prob-1',
    problemSlug: 'tong-hai-so',
    problemTitle: 'Tổng hai số nguyên lớn 64-bit',
    userId: 'usr-learner-1',
    userName: 'Nguyễn Minh Khôi',
    language: 'c',
    status: 'AC',
    isDemo: true,
    submittedAt: '2026-11-09 16:45:00',
    runtimeMs: 4,
    memoryKb: 1920,
    score: 100,
    maxScore: 100,
    sourceCode: `#include <stdio.h>

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) == 2) {
        printf("%lld\\n", a + b);
    }
    return 0;
}`,
    testGroupResults: [
      {
        groupId: 'tg-1',
        groupName: 'Subtask 1: Số nhỏ 32-bit',
        status: 'AC',
        passedCount: 5,
        totalCount: 5,
        score: 50,
        maxScore: 50,
        runtimeMs: 2,
        memoryKb: 1920,
      },
      {
        groupId: 'tg-2',
        groupName: 'Subtask 2: Số lớn 64-bit',
        status: 'AC',
        passedCount: 5,
        totalCount: 5,
        score: 50,
        maxScore: 50,
        runtimeMs: 4,
        memoryKb: 1920,
      },
    ],
  },
  {
    id: 'sub-demo-ac-arr',
    problemId: 'prob-2',
    problemSlug: 'tong-phan-tu-mang',
    problemTitle: 'Tổng phần tử mảng một chiều',
    userId: 'usr-learner-1',
    userName: 'Nguyễn Minh Khôi',
    classroomId: 'cls-cpp-10',
    language: 'python',
    status: 'AC',
    isDemo: true,
    submittedAt: '2026-11-10 09:20:00',
    runtimeMs: 65,
    memoryKb: 14200,
    score: 100,
    maxScore: 100,
    sourceCode: `import sys

tokens = sys.stdin.read().split()
n = int(tokens[0])
print(sum(int(x) for x in tokens[1:n+1]))`,
    testGroupResults: [
      {
        groupId: 'tg-p2-1',
        groupName: 'Subtask 1: N <= 1,000',
        status: 'AC',
        passedCount: 4,
        totalCount: 4,
        score: 40,
        maxScore: 40,
        runtimeMs: 15,
        memoryKb: 9800,
      },
      {
        groupId: 'tg-p2-2',
        groupName: 'Subtask 2: N <= 200,000',
        status: 'AC',
        passedCount: 6,
        totalCount: 6,
        score: 60,
        maxScore: 60,
        runtimeMs: 65,
        memoryKb: 14200,
      },
    ],
  },
  {
    id: 'sub-demo-re-knapsack',
    problemId: 'prob-11',
    problemSlug: 'balo-0-1',
    problemTitle: 'Bài toán cái túi 0/1 (0/1 Knapsack)',
    userId: 'usr-student-2',
    userName: 'Trần Phương Linh',
    classroomId: 'cls-hsg-11',
    language: 'c',
    status: 'RE',
    isDemo: true,
    submittedAt: '2026-11-11 15:10:00',
    runtimeMs: 11,
    memoryKb: 2400,
    score: 40,
    maxScore: 100,
    sourceCode: `#include <stdio.h>
// Khai báo mảng dp[1005] quá nhỏ khi W lên tới 10,000 -> Truy cập vượt biên ở Subtask 2
long long dp[1005];
int main(void) { return 0; }`,
    testGroupResults: [
      {
        groupId: 'tg-p11-1',
        groupName: 'Subtask 1: N <= 20, W <= 1,000',
        status: 'AC',
        passedCount: 4,
        totalCount: 4,
        score: 40,
        maxScore: 40,
        runtimeMs: 5,
        memoryKb: 2400,
      },
      {
        groupId: 'tg-p11-2',
        groupName: 'Subtask 2: N <= 100, W <= 10,000',
        status: 'RE',
        passedCount: 0,
        totalCount: 6,
        score: 0,
        maxScore: 60,
        runtimeMs: 11,
        memoryKb: 2400,
        sampleNote: 'Segmentation fault (SIGSEGV): Mảng dp[1005] bị tràn khi chỉ số W = 10,000.',
      },
    ],
  },
  {
    id: 'sub-demo-pending-grid',
    problemId: 'prob-12',
    problemSlug: 'duong-di-tren-bang',
    problemTitle: 'Đường đi có tổng lớn nhất trên lưới ô vuông',
    userId: 'usr-student-3',
    userName: 'Phạm Gia Huy',
    classroomId: 'cls-hsg-11',
    language: 'cpp',
    status: 'PENDING',
    isDemo: true,
    submittedAt: '2026-11-12 03:40:00',
    score: 0,
    maxScore: 100,
    sourceCode: `#include <iostream>
using namespace std;
int main() { return 0; }`,
    testGroupResults: [],
  },
];
