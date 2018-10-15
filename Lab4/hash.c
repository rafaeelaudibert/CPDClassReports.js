#include <stdio.h>  /* printf */
#include <stdlib.h> /* srand, malloc */
#include <string.h> /* strlen */
#include <time.h>   /* time */

/***********/
/* HEADERS */
/***********/

/* tamanho da tabela (modifique aqui para testar outros valores de M) */
#define M 300
#define strSize 50

/* definicao do elemento da tabela, composto pela chave e dados satelites */
typedef struct
{
    char key[strSize];
    char data[strSize];
} element;

/* definicao da tabela hash */
typedef struct{

    /* TODO: Inserir os componentes necessarios para a tabela
             (depende do tratamento de colisoes escolhido)
             ex: array de flags, array de ponteiros para listas, etc */




} HashTable;

void initializeHashTable(HashTable* ht);

int insertHash(HashTable* ht, element elem);

int searchHash(HashTable* ht, element* elem);

void splitString(char* str, element* elem);

/********/
/* MAIN */
/********/

int main()
{
    srand(time(NULL));

    element elem;
    int i, numCollisions, totalCollisions=0, found;

    /* Inicializa tabela hash */
    HashTable ht;
    initializeHashTable(&ht);

    /* Abre arquivo do dataset */
    FILE* fp = fopen("dataset.txt", "r");
    if (fp == NULL) {
      fprintf(stderr, "Não foi possível abrir dataset!\n");
      return 0;
    }

    /* Le arquivo do dataset inserindo os nomes na hash */
    printf("---------\n TABELA \n---------\n\n");
    i=0;
    char str[2*strSize];
    while (fgets(str, 2*strSize, fp)) {
        /* separa as duas strings de cada linha do dataset em 'key' e 'data'*/
        splitString(str,&elem);

        /* insere elemento na hash, e retorna numero de colisoes durante a insercao */
        numCollisions = insertHash(&ht,elem);

        totalCollisions += numCollisions;

        /* imprime key, data e numero de colisoes */
        printf("-> key: %s\n     data: %-50s | colisoes %d\n", elem.key,elem.data,numCollisions);

        i++;
    }
    fclose(fp);

    /* Abre arquivo de queries */
    fp = fopen("queries.txt", "r");
    if (fp == NULL) {
      fprintf(stderr, "Não foi possível abrir arquivo de queries!\n");
      return 0;
    }

    elem.data[0]='\0';
    /* Le arquivo de queries buscando os nomes na hash */
    printf("\n-----------\n CONSULTAS\n-----------\n\n");
    while (fgets(elem.key, strSize, fp)) {
        elem.key[strlen(elem.key)-1]='\0';

        /* procura elemento na hash por 'elem.key'
           se encontrar atualiza o valor de 'elem.data' e retorna 1,
           caso contrario retorna 0 */
        found = searchHash(&ht,&elem);

        /* imprime se achou ou nao o elemento na tabela hash */
        if(found)
            printf("%s é %s\n",elem.key,elem.data);
        else
            printf("ERRO: %s não encontrado no dataset!\n",elem.key);
    }
    fclose(fp);

    printf("\n---------------------\n");

    return 0;
}

/**************************/
/* Metodos da Tabela Hash */
/**************************/


/* inicializa tabela hash */
void initializeHashTable(HashTable* ht)
{
    /* TODO: inicializar valores da tabela
             (depende da implementacao escolhida)
             ex: setar flags como 0, ponteiros como 0 */




}


/* computa a funcao de hash dada a string key
* --------------------------------
* retorna um valor inteiro entre 0 e M-1
*/
int computeHash(HashTable* ht, const char key[strSize])
{
    int hash=0;

    /* TODO: implementar funcao de hash */



    return hash;
}

/* insere elemento na tabela hash
* --------------------------------
* computa a função de hash sobre a chave em elem.key
* e trata eventuais colisões durante inserção
* se não conseguiu inserir o elemento, retorna -1
* caso contrario, retorna numero de colisoes
*/
int insertHash(HashTable* ht, element elem)
{
    int numCollisions = 0;

    int hash = computeHash(ht,elem.key);

    /* TODO: implementar tratamento de colisoes (e contar a quantidade de colisoes)
             Lembrar de usar strcpy(dst,src) para copiar os valores de elem.key e elem.data para a tabela */





    return numCollisions;
}

/* busca elemento na tabela hash
* ------------------------------
* computa a função de hash sobre a chave em elem->key
* busca na tabela considerando uma resolução de conflitos adequada
* se encontrou elemento, copia dados associados a chave em elem->data e retorna 1
* caso contrario, retorna 0
*/
int searchHash(HashTable* ht, element* elem)
{
    int found=0;
    int hash = computeHash(ht,elem->key);

    /* TODO: implementar busca na tabela, comparando elem->key com os valores de chaves contidos na tabela
             Para a comparação das chaves, usar strcmp(str1,str2), que retorna 0 quando as strings sao iguais
             Quando encontrar a chave, usar strcpy(dst,src) para copiar o valor adequado para elem->data */





    return found;
}


/**********************/
/* Metodos Auxiliares */
/**********************/

void splitString(char* str, element* elem)
{
    int i=0,j=0;
    while(str[i]!='\0' && str[i]!=';'){
        elem->key[i]=str[i];
        i++;
    }
    elem->key[i]='\0';

    i++;
    while(str[i]!='\0' && str[i]!='\n'){
        elem->data[j]=str[i];
        i++;
        j++;
    }
    elem->data[j]='\0';
}

