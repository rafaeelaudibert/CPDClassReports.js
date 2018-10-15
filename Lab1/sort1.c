#include <stdio.h>  /* printf */
#include <stdlib.h> /* srand, malloc, free */
#include <math.h>    /* ceil */
#include <unistd.h> /* usleep */
#include <string.h> /* memcpy, strcmp */
#include <time.h>       /* time */
#include <sys/time.h>   /* struct timeval, gettimeofday */

enum methods {
  SHELL0,
  SHELL1,
  SHELL2,
  BUBBLE,
  INSERTION,
  BINARYINSERTION
};

enum arraySort {
  SORTED,
  REVERSED,
  RANDOM
};

/***********/
/* HEADERS */
/***********/

long long int bubbleSort(int* C, int n);

long long int insertionSort(int* C, int n);

long long int binaryInsertionSort(int* C, int n);

long long int shellSort(int* C, int n, int typeSequence);

typedef struct
{
    struct timeval start;
    struct timeval end;
} Timer;

void startTimer(Timer* t);
float stopTimer(Timer* t);

void createSortedArray(int* C, int size);
void createReversedArray(int* C, int size);
void createRandomArray(int* C, int size);
int isArraySorted(int* C, int size);
void printArray(int* C, int size);
int* generateGapSequence(int maxElem, int type, int* seqSize);
void create_csv(char *filename, double a[][3], int qtdData);
void testSort(char *filename, int metodoSorting, int tipoDeArray, int maxSize);

/********/
/* MAIN */
/********/

int main()
{
    char filename[40];

    //testSort(filename, metodoSorting, tipoDeArray, maxSize);
    strcpy(filename, "bubbleSorted.csv"); testSort(filename, BUBBLE, SORTED, 18);
    strcpy(filename, "insertionSorted.csv"); testSort(filename, INSERTION, SORTED, 18);
    strcpy(filename, "binaryInsertionSorted.csv"); testSort(filename, BINARYINSERTION, SORTED, 18);
    strcpy(filename, "shell0Sorted.csv"); testSort(filename, SHELL0, SORTED, 28);
    strcpy(filename, "shell1Sorted.csv"); testSort(filename, SHELL1, SORTED, 28);
    strcpy(filename, "shell2Sorted.csv"); testSort(filename, SHELL2, SORTED, 28);
    strcpy(filename, "bubbleReversed.csv"); testSort(filename, BUBBLE, REVERSED, 18);
    strcpy(filename, "insertionReversed.csv"); testSort(filename, INSERTION, REVERSED, 18);
    strcpy(filename, "binaryInsertionReversed.csv"); testSort(filename, BINARYINSERTION, REVERSED, 18);
    strcpy(filename, "shell0Reversed.csv"); testSort(filename, SHELL0, REVERSED, 28);
    strcpy(filename, "shell1Reversed.csv"); testSort(filename, SHELL1, REVERSED, 28);
    strcpy(filename, "shell2Reversed.csv"); testSort(filename, SHELL2, REVERSED, 28);
    strcpy(filename, "bubbleRandom.csv"); testSort(filename, BUBBLE, RANDOM, 18);
    strcpy(filename, "insertionRandom.csv"); testSort(filename, INSERTION, RANDOM, 18);
    strcpy(filename, "binaryInsertionRandom.csv"); testSort(filename, BINARYINSERTION, RANDOM, 18);
    strcpy(filename, "shell0Random.csv"); testSort(filename, SHELL0, RANDOM, 28);
    strcpy(filename, "shell1Random.csv"); testSort(filename, SHELL1, RANDOM, 28);
    strcpy(filename, "shell2Random.csv"); testSort(filename, SHELL2, RANDOM, 28);

    return 0;
}

/*******************/
/* TESTING METHOD */
/*******************/
void testSort(char *filename, int metodoSorting, int tipoDeArray, int maxSize){

  srand(time(NULL));

  Timer t;
  float time, repeticoes;
  double changes, vals[maxSize][3];
  int tamanho, i;
  int* array;

  printf("Starting %s with maximum size: %d", filename, maxSize);
  for(tamanho=2, i=0, repeticoes=0, changes=0; tamanho <= 2 << maxSize; tamanho << 1, i++, changes=0, repeticoes=0)
  {

      /* Aloca array de tamanho s */
      array = (int*) malloc(tamanho*sizeof(int));
      switch (tipoDeArray) {
        case SORTED:
          createSortedArray(array, tamanho);
          break;
        case REVERSED:
          createReversedArray(array, tamanho);
          break;
        case RANDOM:
          createRandomArray(array, tamanho);
          break;
        default:
          printf("Tipo de array invalido\n");
          break;
      }

      /* Executa metodo */
      startTimer(&t);
      switch (metodoSorting) {
        case BUBBLE:
          do {
            changes += bubbleSort(array, tamanho);
            time = stopTimer(&t);
            repeticoes++;
            createRandomArray(array, tamanho);
          }while(time < 120 && tipoDeArray == RANDOM && repeticoes < 12); //Se eu tiver uma array aleatoria, vou tentar fazer uma média dos valores de changes e time com no maximo 12 amostras
          changes = changes / (float)repeticoes;
          time /= repeticoes;
          break;
        case INSERTION:
          do {
            changes += insertionSort(array, tamanho);
            time = stopTimer(&t);
            repeticoes++;
            createRandomArray(array, tamanho);
          }while(time < 120 && tipoDeArray == RANDOM && repeticoes < 12); //Se eu tiver uma array aleatoria, vou tentar fazer uma média dos valores de changes e time com no maximo 12 amostras
          changes = changes / (float)repeticoes;
          time /= repeticoes;
          break;
        case BINARYINSERTION:
          do {
            changes += binaryInsertionSort(array, tamanho);
            time = stopTimer(&t);
            repeticoes++;
            createRandomArray(array, tamanho);
          }while(time < 120 && tipoDeArray == RANDOM && repeticoes < 12); //Se eu tiver uma array aleatoria, vou tentar fazer uma média dos valores de changes e time com no maximo 12 amostras
          changes = changes / (float)repeticoes;
          time /= repeticoes;
          break;
        case SHELL0:
        case SHELL1:
        case SHELL2:
          do {
            changes += shellSort(array, tamanho, metodoSorting);
            time = stopTimer(&t);
            repeticoes++;
            createRandomArray(array, tamanho);
          }while(time < 120 && tipoDeArray == RANDOM && repeticoes < 12); //Se eu tiver uma array aleatoria, vou tentar fazer uma média dos valores de changes e time com no maximo 12 amostras
          changes = changes / (float)repeticoes;
          time /= repeticoes;
          break;
        default:
          printf("Metodo de sorting invalido\n");
          break;
      }

      printf("\nSize: %9d\tChanges: %12.0lf\tTime: %5.10f\tRepeticoes: %2.0f", tamanho, changes, time, repeticoes);
      vals[i][0] = (double)tamanho;
      vals[i][1] = (double)changes;
      vals[i][2] = (double)time;

      free(array);
  }
  create_csv(filename, vals, maxSize);

  return;
}

/*******************/
/* SAVE IN CSV METHOD */
/*******************/
void create_csv(char *filename, double a[][3], int qtdData)
{

    FILE *fp;
    int i,j;

    printf("\n Creating %s file",filename);

    fp=fopen(filename,"w+");
    fprintf(fp,"Iteration, Array Size, Swaps, Time");

    for(i=0; i<qtdData; i++)
    {
        fprintf(fp,"\n%d, %.0lf, %.0lf, %lf",i+1, a[i][0], a[i][1], a[i][2]);
    }
    fprintf(fp, "\n");

    fclose(fp);

    printf("\n %s file created\n",filename);
}


/*******************/
/* SORTING Methods */
/*******************/

long long int bubbleSort(int *C, int n)
{
    long long int changes = 0;
    int m = n-1, k = 1, changed, i, temp;

    do
    {
        changed = 0;
        for(i=0; i<m; i++)
        {
            if(C[i] > C[i+1])
            {
                temp = C[i];
                C[i] = C[i+1];
                C[i+1] = temp;

                k = i;
                changed = 1;
                changes++;
            }
        }
        m = k;
    }
    while(changed);

    return changes;
}

long long int insertionSort(int* C, int n)
{
    long long int changes = 0;
    int i, j, key;

    for(j=1; j<n; j++)
    {
        key = C[j];
        i = j-1;
        while(i>=0 && C[i] > key)
        {
            C[i+1] = C[i];
            i--;
            changes++;
        }
        C[i+1] = key;
    }

    return changes;
}

int binarySearch(int* data, int inf, int sup, int key)
{
    int half = inf + ((sup-inf)/2);

    if (inf == sup) return inf;
    else if (key > data[half]) return binarySearch(data, half+1, sup, key);
    else if (key < data[half]) return binarySearch(data, inf, half, key);
    else return half;
}

long long int binaryInsertionSort(int *C, int n)
{
    long long int changes = 0;
    int i, j, key, posicao;

    for(int j=1; j<n; j++)
    {
        key = C[j];
        i = j-1;
        posicao = binarySearch(C, 0, j, key);
        while(i>=posicao)
        {
            C[i+1] = C[i];
            i--;
            changes++;
        }

        C[posicao] = key;
    }

    return changes;
}

long long int insertionShellSort(int *C, int n, int h, int f)
{
    long long int changes = 0;
    int i, j, key;

    for(int j=f+h; j<n; j+=h)
    {
        key = C[j];
        i = j-h;
        while(i>=0 && C[i] > key)
        {
            C[i+h] = C[i];
            i-=h;
            changes++;
        }
        C[i+h] = key;
    }

    return changes;
}

int* generateGapSequence(int maxElem, int type, int* seqSize)
{
    int* seq;
    int i,e=1,numElems=1;
    if(type==0) /* (Shell,1959) - sequencia 1, 2, 4, 8, 16, 32, ...*/
    {
        while(e<maxElem)
        {
            e *= 2;
            numElems++;
        }
        numElems--;
        seq = (int*) malloc(numElems*sizeof(int));
        e=1;
        for(i=0; i<numElems; i++)
        {
            seq[i] = e;
            e *= 2;
        }
    }
    else if(type==1)   /* (Knuth,1971) - sequencia 1, 4, 13, 40, 121, 364, ...*/
    {
        while(e<maxElem)
        {
            e = e*3+1;
            numElems++;
        }
        numElems--;
        seq = (int*) malloc(numElems*sizeof(int));
        e=1;
        for(i=0; i<numElems; i++)
        {
            seq[i] = e;
            e = e*3 + 1;
        }
    }
    else if(type==2) /* (Tokuda,1992) - sequencia 1, 4, 9, 20, 46, 103, ...*/
    {
        numElems=0;
        while(e<maxElem)
        {
            e = (ceil((9.0 * pow(9.0,numElems)/pow(4.0,numElems) - 4.0)/5.0));
            numElems++;
        }
        numElems--;
        seq = (int*) malloc(numElems*sizeof(int));
        for(i=0; i<numElems; i++)
        {
            e = (ceil((9.0 * pow(9.0,i)/pow(4.0,i) - 4.0)/5.0));
            seq[i] = e;
        }
    }

    *seqSize = numElems;
    return seq;
}

long long int shellSort(int *C, int n, int typeSequence)
{
    int numElems;
    int* sequence = generateGapSequence(n,typeSequence,&numElems);

    long long int changes = 0;
    int i, h, f;

    for(i=numElems-1; i>=0; i--)
    {
        h = sequence[i];
        for(f=0; f<h; f++)
        {
            changes += insertionShellSort(C,n,h,f);
        }
    }

    free(sequence);

    return changes;
}

/*****************/
/* TIMER Methods */
/*****************/

void startTimer(Timer* t)
{
    gettimeofday(&(t->start), NULL);

    return;
}

float stopTimer(Timer *t)
{
    gettimeofday(&(t->end), NULL);

    if (t->start.tv_usec > t->end.tv_usec)
    {
        t->end.tv_usec += 1000000;
        t->end.tv_sec--;
    }

    return (float)(t->end.tv_sec - t->start.tv_sec) +
           ((float)t->end.tv_usec - (float)t->start.tv_usec)/1000000.0;
}

/*****************/
/* ARRAY Methods */
/*****************/

void createSortedArray(int* C, int size)
{
    int i;
    for(i=0; i<size; i++)
        C[i] = i;

    return;
}

void createReversedArray(int* C, int size)
{
    int i, j=size-1;
    for(i=0; i<size; i++)
    {
        C[i] = j--;
    }

    return;
}

void createRandomArray(int* C, int size)
{
    int i, s, index;

    for(i=0; i<size; i++) C[i] = i;
    for(s=size; s>0; s--)
    {
        index = rand()%s;

        /* troca C[index] com C[s-1] */
        int temp = C[s-1];
        C[s-1] = C[index];
        C[index] = temp;
    }

    return;
}

int isArraySorted(int* C, int size)
{
    int i;

    for(i=0; i<size-1; i++)
        if(C[i]>C[i+1]) return 0;
    return 1;
}

void printArray(int* C, int size)
{
    int i;

    if(size>0)
    {
        printf("[");
        for(i=0; i<size; i++) printf("%d ",C[i]);
        printf("]\n");
    }

    return;
}
