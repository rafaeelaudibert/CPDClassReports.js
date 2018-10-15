#include <stdio.h> /* fopen, fprintf, fscanf, stderr */
#include <stdlib.h> /* srand, malloc, free */
#include <time.h> /* time */
#include <string.h> /* memcpy */
#include <sys/time.h>   /* struct timeval, gettimeofday */
#include <math.h> /* sqrt, pow */

/**************/
/* CABECALHOS */
/**************/

#define NUM_FILES 200
#define MAX_INPUT_SIZE 1000000
#define MAX_DIGITS 6 // Biggest number is 999999
#define MERGED_OUTPUT_SIZE NUM_FILES*MAX_INPUT_SIZE

int totalCalls;
int somaTotalCalls = 0, somaTotalCallsQuadrado = 0;
float somaTimer = 0, somaTimerQuadrado = 0;
int input_size = 2;

typedef struct
{
    struct timeval start;
    struct timeval end;
} Timer;

void startTimer(Timer* t);
float stopTimer(Timer* t);

int* readFile(char* fileName);
void writeFile(char* fileName, int* C, int size);

int* runMergeSort(int* array, int size);
int* runQuickSort(int* array, long long int size);
int* runRadixSort(int* array, int size);
int isArraySorted(int* array, int size);
void mergeSortedArrays(int** input, int* output, int p, int N);
void mergeWithSelectionTree(int** input, int* output, int p, int n);
int popFromArray(int** input, int k);
int topFromArray(int** input, int k);

int head_of_file[NUM_FILES]; // usado para indicar onde esta o proximo dado nao-lido de cada array
void resetIteration();

void calculaDesvioPadrao(int* arrayCalls, double* arrayTimer, FILE* fp);

/*************/
/* PRINCIPAL */
/*************/

void ex1()
{
    int i;
    char fileName[20];
    Timer t;
    float timer;
    FILE *fp; // Arquivo onde será escrito o CSV
    char csvName[] = "radixSort200.csv";

    /* Array de ponteiros para 'NUM_FILES' arrays de dados */
    int *input[NUM_FILES], *sortedArray;
    int arrayCalls[NUM_FILES];
    double arrayTimer[NUM_FILES];

    // Creating CSV file
    printf("-> Creating %s file\n",csvName);
    fp=fopen(csvName,"w+");
    fprintf(fp,"Numbers per File, Recursive Calls, Time, Recursive Calls Average, Time Average, Calls Standard Deviation, Timer Standard Deviation\n");

    for(input_size = 2; input_size<MAX_INPUT_SIZE; input_size = input_size << 1){

      resetIteration();
      printf("Testando com input_size = %10d |\n", input_size, (float)input_size*NUM_FILES);

      /* ordena cada um dos arquivos de entrada */
      for(i=0; i<NUM_FILES; i++)
      {

          /* Le arquivo de entrada e coloca os dados no array 'input[i]' */
          sprintf(fileName,"files/file%02d.txt",i);
          //printf("ENTRADA: %s\n",fileName);
          input[i] = readFile(fileName);

          /* ordena array */

          startTimer(&t);

          /* DESCOMENTE UM DOS METODOS ABAIXO PARA ORDENAR O ARRAY */
          //sortedArray = runMergeSort(input[i],input_size);
          //sortedArray = runQuickSort(input[i],input_size);
          sortedArray = runRadixSort(input[i], input_size);

          timer = stopTimer(&t);
          //printf("Time %f\n",timer);

          /* checa se esta ordenado */
          // printf("ordenado? ");
          // if(isArraySorted(sortedArray,input_size))
          // {
          //     printf("sim\n");
          //
          //     /* salva arquivo de saida */
          //     sprintf(fileName,"sorted/file%02d.txt",i);
          //     printf("SAIDA: %s\n",fileName);
          //     writeFile(fileName,sortedArray,input_size);
          // }
          // else
          // {
          //     printf("nao\n");
          // }

          printf(" Sorted? %s\tTime: %0.10f\n",(isArraySorted(sortedArray,input_size)?"Y":"N"), timer);

          somaTotalCalls += totalCalls;
          arrayCalls[i] = totalCalls;
          somaTimer += timer;
          arrayTimer[i] = timer;

          free(input[i]);
          free(sortedArray);
      }

      fprintf(fp,"%d, ", input_size); // O resto será printado em calculaDesvioPadrao
      fflush(fp);
      calculaDesvioPadrao(arrayCalls, arrayTimer, fp);
    }

    fclose(fp);
    printf("-> %s file created\n",csvName);


}

void ex2()
{
    int i, contador = 0;
    char fileName[20];
    Timer t;
    float time;
    FILE *fp; // Arquivo onde será escrito o CSV
    char csvName[] = "selectionTree200.csv";

    /* Array de ponteiros para 'NUM_FILES' arrays de dados */
    int* input[NUM_FILES];

    /* Le arquivos de entrada (ja ordenados) */
    printf("----------\nLeitura dos arquivos de entrada:\n");
    for(i=0; i<NUM_FILES; i++)
    {
        /* Le arquivo de entrada e coloca os dados no array 'input[i]' */
        sprintf(fileName,"sortedBig/file%02d.txt",i);
        printf("%s\n",fileName);
        input[i] = readFile(fileName);
    }
    printf("----------\n");

    // Creating CSV file
    printf("-> Creating %s file\n",csvName);
    fp=fopen(csvName,"w+");
    fprintf(fp,"Numbers per File, Time, Time Per File, Output Size\n");

    for(input_size = 2; input_size<MAX_INPUT_SIZE; input_size = input_size << 1){

      /* Aloca array de saida que ira conter todos os dados de entrada */
      int* output = (int*) malloc(input_size*NUM_FILES*sizeof(int));

      resetIteration(); //Reset head of files
      printf("Testando com input & output_size = %10d | %14.0f \tSorted? ", input_size, (float)input_size*NUM_FILES);

      /* Copia (concatena) dados de entrada no array de saida */
      for(i=0; i<NUM_FILES; i++)
      {
          memcpy(&output[i*input_size],input[i],input_size*sizeof(int));
      }

      //printf("ordenado? %s\n",(isArraySorted(output,input_size*NUM_FILES)?"sim":"nao"));

      startTimer(&t);
      /* DESCOMENTE UM DOS METODOS ABAIXO PARA ORDENAR O ARRAY DE SAIDA */
    //    runQuickSort(output,input_size*NUM_FILES);
        mergeSortedArrays(input,output,NUM_FILES,input_size*NUM_FILES);
    //    mergeWithSelectionTree(input,output,NUM_FILES,input_size*NUM_FILES);

      time = stopTimer(&t);

      printf("%s\tTime: %0.10f\n",(isArraySorted(output,input_size*NUM_FILES)?"Y":"N"), time);
      //printf("Qtd arquivos: %d\tQtd numeros p/arquivo: %d\t Array total: %d\tTime: %f\n", NUM_FILES, input_size, input_size*NUM_FILES, time);

      fprintf(fp, "%d, %.10lf, %.10lf, %.0f\n", input_size, time, time/NUM_FILES, (float)input_size*NUM_FILES);
      fflush(fp);
    }

    /* salva arquivo de saida */
    // sprintf(fileName,"sortedBig/output.txt");
    // printf("SAIDA: %s\n",fileName);
    // writeFile(fileName,output,MERGED_OUTPUT_SIZE);

    fclose(fp);
    printf("-> %s file created\n",csvName);
}

int main()
{
    srand(time(NULL));

    resetIteration();

    /* Exercicio 1 */
    ex1();

    /* Exercicio 2 */
     //ex2();

    return 0;
}

/*************/
/*  HELPERS  */
/*************/

void calculaDesvioPadrao(int* arrayCalls, double* arrayTimer, FILE* fp)
{
    double esperancaCalls = (double)somaTotalCalls/NUM_FILES, esperancaTimer = somaTimer/NUM_FILES, acumuladoCalls = 0, acumuladoTimer = 0;
    double callsDeviation, timerDeviation;

    for(int i=0; i<NUM_FILES; i++){
      acumuladoCalls += pow(arrayCalls[i] - esperancaCalls, 2);
      acumuladoTimer += pow(arrayTimer[i] - esperancaTimer, 2);
    }

    callsDeviation = sqrt(acumuladoCalls / NUM_FILES);
    timerDeviation = sqrt(acumuladoTimer / NUM_FILES);

    //printf("Media das calls: %.0lf\t\tMedia dos tempos: %.10lf\n", esperancaCalls, esperancaTimer);
    //printf("Desvio padrao das chamadas: %.10lf\t\tDesvio padrao do timer: %.10lf\n", callsDeviation, timerDeviation);

    fprintf(fp, "%d, %f, %.0lf, %lf, %.10lf, %.10lf\n", somaTotalCalls, somaTimer, esperancaCalls, esperancaTimer, callsDeviation, timerDeviation);

    return;
}

void resetIteration(){
  /* inicializa indicadores do inicio de cada array */
  for(int k=0; k<NUM_FILES; k++)
      head_of_file[k]=0;

    somaTotalCalls = 0;
    somaTotalCallsQuadrado = 0;
    somaTimer = 0;
    somaTimerQuadrado = 0;
}


/*********************************/
/* Metodos usados no EXERCICIO 1 */
/*********************************/

int isArraySorted(int* array, int size)
{
    int i;

    for(i=0; i<size-1; i++)
        if(array[i]>array[i+1])
            return 0;
    return 1;
}

void merge(int *C, int* Aux, int i, int m, int f)
{
    /*TODO: Implementar o metodo */
    int k, j;
    for(k=i; k<=f; k++)
        Aux[k] = C[k];

    j = m+1;
    for(k=i; k<=f; k++)
    {
        if (i>m)
            C[k] = Aux[j++];
        else if (j>f)
            C[k] = Aux[i++];
        else if (Aux[i] <= Aux[j])
            C[k] = Aux[i++];
        else
            C[k] = Aux[j++];
    }

    return;
}

void mergeSort(int *C, int* Aux, int i, int f)
{
    int m;
    totalCalls++;
    /*TODO: Implementar o metodo */

    if(f>i)
    {
        m = (i+f)/2;
        mergeSort(C, Aux, i, m);
        mergeSort(C, Aux, m+1, f);
        merge(C, Aux, i, m, f);
    }

    return;
}

int partition(int* C, long long int pi, long long int pf)
{
    long long int random = (rand() % (pf - pi)) + pi, p=pf, i=pi-1, j, temp;

    // Random pivot to make it better sorting already sorted stuff
    temp = C[random];
    C[random] = C[pf];
    C[pf] = temp;


    for(j=pi; j<=pf-1; j++)
    {
        if(C[j]<=C[p])
        {
            i++;
            temp=C[i];
            C[i]=C[j];
            C[j]=temp;
        }
    }
    i++;
    temp = C[i];
    C[i] = C[p];
    C[p] = temp;

    return i;
}

void quickSort(int* C, long long int i, long long int f)
{
    int p;

    totalCalls++;
    if (f>i)
    {
        p = partition(C, i, f);
        quickSort(C, i, p-1);
        quickSort(C, p+1, f);
    }

    return;


}

int* runMergeSort(int* array, int size)
{
    totalCalls=0;

    /* Aloca array auxiliar com o tamanho certo de elementos */
    int *Aux = (int*) malloc(size*sizeof(int));

    mergeSort(array,Aux,0,size-1);

    free(Aux);

    //printf("Total calls %d\n",totalCalls);

    return array;
}

int digito(int valor, int posicao){
  int r, t1, t2;

  t1 = pow(10, posicao+1);
  r = valor % t1;

  if (posicao > 0)
  {
      t2 = pow(10, posicao);
      r = r / t2;
  }

  return r;
}

int* runRadixSort(int* A, int size)
{

    int d, i, dj;
    int *C = (int*) malloc(10*sizeof(int)), *B = (int*) malloc(size*sizeof(int));

    totalCalls=0; //Será sempre 0, já que não usa comparações, é linear

    for(d=0; d<MAX_DIGITS; d++){
      for(i=0; i<10; i++) C[i] = 0; //Zera matriz contadora

      for(i=0; i<size; i++){
        dj = digito(A[i], d);
        C[dj]++;
      }

      for(i=1; i<10; i++) C[i] += C[i-1]; //Usado para manter estabilidade

      for(i=size-1; i>=0; i--){
        dj = digito(A[i], d);
        B[C[dj] - 1] = A[i];
        C[dj]--;
      }

      for(i=0; i<size; i++)
        A[i] = B[i];
    }

    free(C);

    return B;
}

int* runQuickSort(int* array, long long int size)
{
    totalCalls=0;

    quickSort(array,0,size-1);

    //printf("Total calls %d\n",totalCalls);

    return array;

}

/*********************************/
/* Metodos usados no EXERCICIO 2 */
/*********************************/

int topFromArray(int** input, int k)
{
    if(head_of_file[k]<input_size)
        return input[k][head_of_file[k]];
    else
        return 10000000;
}

int popFromArray(int** input, int k)
{
    if(head_of_file[k]<input_size)
        return input[k][head_of_file[k]++];
    else
        return 10000000;
}

void heapify(int* heap, int** input, int p, int i){
 int e, d, menor;

 while(i < p-1){
   e = 2*i + 1;
   d = 2*i + 2;
   menor = heap[e] <= heap[d] ? e : d;
   heap[i] = heap[menor];
   i = menor;
 }

 heap[i] = popFromArray(input, i-p+1);

 return;
}

int* buildHeap(int* heap, int** input, int p, int heapSize){

  for(int i=heapSize-1; i>=0; i--) heapify(heap, input, p, i); //Heapify it, pulling stuff from the files

  return heap;
}

int popFromSelectionTree(int* tree, int size, int** input, int p)
{
    int r = tree[0], i = 0, menor;

    while(i < p-1){
      menor = tree[2*i + 1] <= tree[2*i + 2] ? 2*i + 1 : 2*i + 2;
      tree[i] = tree[menor];
      i = menor;
    }

    tree[i] = popFromArray(input, i-p+1);

    return r;
}

void mergeWithSelectionTree(int** input, int* output, int p, int n)
{
    int size=2*p-1, i;
    int* tree = buildHeap((int*) malloc(size*sizeof(int)), input, p, size);

    for(i=0; i<n;i++) output[i] = popFromSelectionTree(tree, size, input, p);

    return;
}

void mergeSortedArrays(int** input, int* output, int p, int N)
{
    int i, k, menor, index=-1;
    for(i=0; i<N; i++){
      menor = topFromArray(input, 0);
      index = 0;
      for(k=1; k<p; k++){
        if (topFromArray(input, k) < menor){
          menor = topFromArray(input, k);
          index = k;
        }
      }
      output[i] = popFromArray(input, index);
    }

    return;
}


/********************/
/* Metodos do TIMER */
/********************/

void startTimer(Timer* t)
{
    gettimeofday(&(t->start), NULL);
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

/*****************************/
/* Entrada e Saida - Arquivos*/
/*****************************/

int* readFile(char* fileName)
{
    /* Aloca array com o tamanho certo de elementos */
    int *C = (int*) malloc(MAX_INPUT_SIZE*sizeof(int));

    /* Abre arquivo */
    FILE* fp;
    fp = fopen(fileName, "r");
    if (fp == NULL)
    {
        fprintf(stderr, "Can't open input file '%s'!\n",fileName);
        return C;
    }

    /* Le arquivo */
    int i;
    for(i=0; i<MAX_INPUT_SIZE; i++)
    {
        fscanf(fp, "%d", &(C[i]) );
    }

    fclose(fp);

    return C;
}

void writeFile(char* fileName, int* C, int size)
{
    /* Abre arquivo */
    FILE* fp;
    fp = fopen(fileName, "w");
    if (fp == NULL)
    {
        fprintf(stderr, "Can't open output file '%s'!\n",fileName);
        return;
    }

    /* Escreve arquivo */
    int i;
    for(i=0; i<size; i++)
    {
        fprintf(fp, "%06d ", C[i]);
        if(i%20==19)
            fprintf(fp, "\n");
    }

    fclose(fp);
}
