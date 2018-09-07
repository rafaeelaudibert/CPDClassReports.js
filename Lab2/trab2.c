#include <stdio.h> /* fopen, fprintf, fscanf, stderr */
#include <stdlib.h> /* srand, malloc, free */
#include <time.h> /* time */
#include <string.h> /* memcpy */
#include <sys/time.h>   /* struct timeval, gettimeofday */
#include <math.h> /* sqrt, pow */

/**************/
/* CABECALHOS */
/**************/

#define NUM_FILES 50
#define INPUT_SIZE 100000
#define MERGED_OUTPUT_SIZE NUM_FILES*INPUT_SIZE

int totalCalls;
int somaTotalCalls = 0, somaTotalCallsQuadrado = 0;
float somaTimer = 0, somaTimerQuadrado = 0;

typedef struct
{
    struct timeval start;
    struct timeval end;
} Timer;

void startTimer(Timer* t);
float stopTimer(Timer* t);

int* readFile(char* fileName);
void writeFile(char* fileName, int* C, int size);

void runMergeSort(int* array, int size);
void runQuickSort(int* array, int size);
int isArraySorted(int* array, int size);
void mergeSortedArrays(int** input, int* output, int p, int N);
void mergeWithSelectionTree(int** input, int* output, int p, int n);
int popFromArray(int** input, int k);
int topFromArray(int** input, int k);

int head_of_file[NUM_FILES]; // usado para indicar onde esta o proximo dado nao-lido de cada array

void calculaMedias();
void calculaDesvioPadrao(int* arrayCalls, double* arrayTimer);

/*************/
/* PRINCIPAL */
/*************/

void ex1()
{
    int i;
    char fileName[20];
    Timer t;
    float timer;

    /* Array de ponteiros para 'NUM_FILES' arrays de dados */
    int* input[NUM_FILES];
    int arrayCalls[NUM_FILES];
    double arrayTimer[NUM_FILES];

    /* ordena cada um dos arquivos de entrada */
    for(i=0; i<NUM_FILES; i++)
    {

        /* Le arquivo de entrada e coloca os dados no array 'input[i]' */
        sprintf(fileName,"files/file%02d.txt",i);
        printf("ENTRADA: %s\n",fileName);
        input[i] = readFile(fileName);

        /* ordena array */

        startTimer(&t);

        /* DESCOMENTE UM DOS METODOS ABAIXO PARA ORDENAR O ARRAY */
        runMergeSort(input[i],INPUT_SIZE);
        //runQuickSort(input[i],INPUT_SIZE);

        timer = stopTimer(&t);
        printf("Time %f\n",timer);

        /* checa se esta ordenado */
        printf("ordenado? ");
        if(isArraySorted(input[i],INPUT_SIZE))
        {
            printf("sim\n");

            /* salva arquivo de saida */
            sprintf(fileName,"sorted/file%02d.txt",i);
            printf("SAIDA: %s\n",fileName);
            writeFile(fileName,input[i],INPUT_SIZE);
        }
        else
        {
            printf("nao\n");
        }

        somaTotalCalls += totalCalls;
        arrayCalls[i] = totalCalls;
        somaTimer += timer;
        arrayTimer[i] = timer;

        free(input[i]);
    }

    calculaMedias();
    calculaDesvioPadrao(arrayCalls, arrayTimer);


}

void ex2()
{
    int i;
    char fileName[20];
    Timer t;
    float time;

    /* Array de ponteiros para 'NUM_FILES' arrays de dados */
    int* input[NUM_FILES];

    /* Le arquivos de entrada (ja ordenados) */
    for(i=0; i<NUM_FILES; i++)
    {

        /* Le arquivo de entrada e coloca os dados no array 'input[i]' */
        sprintf(fileName,"sorted/file%02d.txt",i);
        printf("ENTRADA: %s\n",fileName);
        input[i] = readFile(fileName);
    }

    /* Aloca array de saida que ira conter todos os dados de entrada */
    int* output = (int*) malloc(MERGED_OUTPUT_SIZE*sizeof(int));

    /* Copia (concatena) dados de entrada no array de saida */
    for(i=0; i<NUM_FILES; i++)
    {
        memcpy(&output[i*INPUT_SIZE],input[i],INPUT_SIZE*sizeof(int));
    }

    printf("ordenado? %s\n",(isArraySorted(output,MERGED_OUTPUT_SIZE)?"sim":"nao"));

    startTimer(&t);

    /* DESCOMENTE UM DOS METODOS ABAIXO PARA ORDENAR O ARRAY DE SAIDA */
//    runQuickSort(output,MERGED_OUTPUT_SIZE);
//    mergeSortedArrays(input,output,NUM_FILES,MERGED_OUTPUT_SIZE);
    mergeWithSelectionTree(input,output,NUM_FILES,MERGED_OUTPUT_SIZE);

    time = stopTimer(&t);
    printf("Time %f\n",time);

    printf("ordenado? %s\n",(isArraySorted(output,MERGED_OUTPUT_SIZE)?"sim":"nao"));

    /* salva arquivo de saida */
    sprintf(fileName,"sorted/output.txt");
    printf("SAIDA: %s\n",fileName);
    writeFile(fileName,output,MERGED_OUTPUT_SIZE);
}

int main()
{
    srand(time(NULL));

    /* inicializa indicadores do inicio de cada array */
    for(int k=0; k<NUM_FILES; k++)
        head_of_file[k]=0;

    /* Exercicio 1 */
    //ex1();

    /* Exercicio 2 */
    ex2();

    return 0;
}

/*************/
/*  HELPERS  */
/*************/
void calculaMedias()
{

    printf("Media das calls: %d\t\tMedia dos tempos: %f\n", somaTotalCalls/NUM_FILES, somaTimer/NUM_FILES);

    return;
}

void calculaDesvioPadrao(int* arrayCalls, double* arrayTimer)
{
    double esperancaCalls = (double)somaTotalCalls/NUM_FILES, esperancaTimer = somaTimer/NUM_FILES, acumuladoCalls = 0, acumuladoTimer = 0;

    for(int i=0; i<NUM_FILES; i++){
      acumuladoCalls += pow(arrayCalls[i] - esperancaCalls, 2);
      acumuladoTimer += pow(arrayTimer[i] - esperancaTimer, 2);
      printf("T: %lf\n", arrayTimer[i]);
    }

    printf("Desvio padrao das chamadas: %.10lf\t\tDesvio padrao do timer: %.10lf\n", sqrt(acumuladoCalls / NUM_FILES), sqrt(acumuladoTimer / NUM_FILES));

    return;
}


/*********************************/
/* Metodos usados no EXERCICIO 1 */
/*********************************/

int isArraySorted(int* array, int size)
{
    int i;
    for(i=0; i<size-1; i++)
    {
        if(array[i]>array[i+1])
            return 0;
    }
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

int partition(int* C, int pi, int pf)
{
    int p=pf, i=pi-1, j, temp;
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

void quickSort(int* C, int i, int f)
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

void runMergeSort(int* array, int size)
{
    totalCalls=0;

    /* Aloca array auxiliar com o tamanho certo de elementos */
    int *Aux = (int*) malloc(size*sizeof(int));

    mergeSort(array,Aux,0,size-1);

    free(Aux);

    printf("Total calls %d\n",totalCalls);
}

void runQuickSort(int* array, int size)
{
    totalCalls=0;

    quickSort(array,0,size-1);

    printf("Total calls %d\n",totalCalls);

}

/*********************************/
/* Metodos usados no EXERCICIO 2 */
/*********************************/

int topFromArray(int** input, int k)
{
    if(head_of_file[k]<INPUT_SIZE)
        return input[k][head_of_file[k]];
    else
        return 10000000;
}

int popFromArray(int** input, int k)
{
    if(head_of_file[k]<INPUT_SIZE)
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
    int *C = (int*) malloc(INPUT_SIZE*sizeof(int));

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
    for(i=0; i<INPUT_SIZE; i++)
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
