// Over-engineered emulike
/* FIXME jumps disregard literals in RAM */
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <stdint.h>

#define RAM_SIZE 0xFF
enum e_REGS{
  REG_A,
  REG_B,
  REG_PC,
  REG_TTL
};

int16_t RAM[RAM_SIZE];
uint16_t registers[REG_TTL];

void initSys();
int compile(const char* filename);
void run();

static inline void hlf(enum e_REGS r) {
  printf("HLF %d\n", r);
  registers[r]>>=1;
  ++registers[REG_PC];

  printf("->a: %d\n->b: %d\n->pc: %d\n", registers[REG_A], registers[REG_B], registers[REG_PC]);
}
static inline void tpl(enum e_REGS r) {
  printf("TPL %d\n", r);

  registers[r] += registers[r] << 1;
  ++registers[REG_PC];

  printf("->a: %d\n->b: %d\n->pc: %d\n", registers[REG_A], registers[REG_B], registers[REG_PC]);

}
static inline void inc(enum e_REGS r) {
  printf("INC %d\n", r);

  ++registers[r];
  ++registers[REG_PC];

  printf("->a: %d\n->b: %d\n->pc: %d\n", registers[REG_A], registers[REG_B], registers[REG_PC]);

}
static inline void jmp(int16_t offset) {
  printf("JMP %d\n", offset);

  registers[REG_PC] += offset;
  ++registers[REG_PC]; // Jump over offset

  printf("->a: %d\n->b: %d\n->pc: %d\n", registers[REG_A], registers[REG_B], registers[REG_PC]);

}
static inline void jie(enum e_REGS r, uint16_t offset) {
  printf("JIE %d %d\n", r, offset);

  registers[REG_PC] += registers[r]&1 ? 1 : offset;
  ++registers[REG_PC]; // Jump over offset

  printf("->a: %d\n->b: %d\n->pc: %d\n", registers[REG_A], registers[REG_B], registers[REG_PC]);

}
static inline void jio(enum e_REGS r, uint16_t offset) {
  printf("JIO %d %d\n", r, offset);

  registers[REG_PC] += registers[r] == 1 ? offset : 1;
  ++registers[REG_PC]; // Jump over offset

  printf("->a: %d\n->b: %d\n->pc: %d\n", registers[REG_A], registers[REG_B], registers[REG_PC]);

}


int main(int argc, char const *argv[]) {
  initSys();
  compile("../input.txt");
  run();
  fprintf(stdout, "%d\n", registers[REG_A]);

  for (size_t i = 0, nlc = 0; i < RAM_SIZE; ++i) {
    printf("%.8x ", RAM[i]);

    if (++nlc == 10) {
      nlc = 0;
      putc('\n', stdout);
    }
  }
  putc('\n', stdout);

  return 0;
}

void initSys() {
  registers[REG_A] = 0;
  registers[REG_B] = 0;
  registers[REG_PC] = 0;

  for (size_t i = 0; i < RAM_SIZE; ++i)
    RAM[i] = 0;
}

/**
 * hlf 1000 
 * tpl 0001
 * inc 0010
 * jmp 0011
 * jie 0100
 * jio 0101
 * 
 * a 0000
 * b 0001
 * ofs xxxx_xxxx
 */

int compile(const char* filename) {
  FILE* ifile = fopen(filename, "r");

  char buf[0xFF];
  int ram_loc = 0;
  
  if (ifile) {
    while(fgets(buf, sizeof buf, ifile)) {
      int16_t instr = 0x00;
      int wasJump = 0;
      int offset = 0;

      //printf("Parsing %s\n", buf);

      char* pch = strtok(buf, " ");

      if (
        strcmp(pch, " ") == 0 || 
        strcmp(pch, "\n") == 0
      ) continue;

      while(pch != NULL) {
        // printf(">>>%s", pch);

        if (strcmp(pch, "hlf") == 0) {
          instr |= (8<<4);
          pch = strtok(NULL, " ");
          if (pch[0] == 'a');
          else if (pch[0] == 'b') instr |= 0x01;
          else {
            fprintf(stderr, "unknown register %s\n", pch);
            return 1;
          }
        }
        else if (strcmp(pch, "tpl") == 0) {
          instr |= (1<<4);
          pch = strtok(NULL, " ");
          if (pch[0] == 'a');
          else if (pch[0] == 'b') instr |= 0x01;
          else {
            fprintf(stderr, "unknown register %s\n", pch);
            return 1;
          }
        }
        else if (strcmp(pch, "inc") == 0) {
          instr |= (2<<4);
          pch = strtok(NULL, " ");
          if (pch[0] == 'a');
          else if (pch[0] == 'b') instr |= 0x01;
          else {
            fprintf(stderr, "unknown register %s\n", pch);
            return 1;
          }
        }
        else if (strcmp(pch, "jmp") == 0) {
          instr |= (3<<4);
          pch = strtok(NULL, " ");
          offset = strtol(pch, NULL, 10);
          wasJump = 1;
        }
        else if (strcmp(pch, "jie") == 0) {
          instr |= (4<<4);
          pch = strtok(NULL, " ");
          if (pch[0] == 'a');
          else if (pch[0] == 'b') instr |= 0x01;
          else {
            fprintf(stderr, "unknown register %s\n", pch);
            return 1;
          }

          pch = strtok(NULL, " ");
          offset = strtol(pch, NULL, 10);
          wasJump = 1;
        }
        else if (strcmp(pch, "jio") == 0) {
          instr |= (5<<4);
          pch = strtok(NULL, " ");
          if (pch[0] == 'a');
          else if (pch[0] == 'b') instr |= 0x01;
          else {
            fprintf(stderr, "unknown register %s\n", pch);
            return 1;
          }

          pch = strtok(NULL, " ");
          offset = strtol(pch, NULL, 10);
          wasJump = 1;
        }
        else {
          fprintf(stderr, "Unknown instruction %s", pch);
          return 1;
        }
        pch = strtok(NULL, " ");
        /*printf("Result %x\n", instr);
        putc('\n', stdout);*/

        RAM[ram_loc++] = instr;
        if (wasJump) {
          RAM[ram_loc++] = offset;
        }
      }
    }
    fclose(ifile);
    return 1;
  }
  else {
    perror("Failed to read input.txt");
    return 0;
  }
}

void run() {
  while (RAM[registers[REG_PC]] != 0) {
    int instr = RAM[registers[REG_PC]]>>4;

    switch(instr) {
      case 0b1000:
        hlf((RAM[registers[REG_PC]]&0x0F) == 0 ? REG_A : REG_B);
        break;
      case 0b0001:
        tpl((RAM[registers[REG_PC]]&0x0F) == 0 ? REG_A : REG_B);
        break;
      case 0b0010:
        inc((RAM[registers[REG_PC]]&0x0F) == 0 ? REG_A : REG_B);
        break;
      case 0b0011:
        jmp(RAM[registers[REG_PC]+1]);
        break;
      case 0b0100:
        jie(
          (RAM[registers[REG_PC]]&0x0F) == 0 ? REG_A : REG_B,
          RAM[registers[REG_PC]+1]
        );
        break;
      case 0b0101:
        jio(
          (RAM[registers[REG_PC]]&0x0F) == 0 ? REG_A : REG_B,
          RAM[registers[REG_PC]+1]
        );
        break;
      default: 
        printf("UNKNOWN %.8x\n", instr);
        return;
    }
  }
}