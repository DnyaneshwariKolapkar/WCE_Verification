#include<stdio.h>
#include<signal.h>
#include<stdlib.h>
#include<sys/types.h>
#include<unistd.h>
void sighup();
void sigint();
void sigquit();
void sig_handler(int);
int main()
{
int pid;
if ((pid = fork()) < 0)
{
perror("fork");
exit(1);
}
if (pid == 0)
{

signal(SIGHUP,sighup);
signal(SIGINT,sigint);
signal(SIGQUIT, sigquit);
signal(SIGUSR1, sig_handler);
signal(SIGSTOP, sig_handler) ;
for(;;);
}
else
{
printf("\nPARENT: sending SIGHUP\n\n");
kill(pid,SIGHUP);
sleep(3);
printf("\nPARENT: sending SIGINT\n\n");
kill(pid,SIGINT);
sleep(3);
printf("\nPARENT: sending SIGQUIT\n\n");
kill(pid,SIGQUIT);
sleep(3);
printf("\nPARENT: sending SIGUSR1\n\n");
kill(pid,SIGUSR1);
sleep(3);
printf("\nPARENT: sending SIGSTOP\n\n");
kill(pid,SIGSTOP);
sleep(3);
}
}
void sighup()
{
signal(SIGHUP,sighup);
printf("CHILD: I have received a SIGHUP\n");
}
void sigint()
{
signal(SIGINT,sigint);
printf("CHILD: I have received a SIGINT\n");
}
void sigquit()
{
printf("My DADDY has Killed me!!!\n");
exit(0);
}
void sig_handler(int signo)
{
if (signo == SIGUSR1)
{
signal(SIGUSR1, sig_handler);
printf("received SIGUSR1\n");
}
else if (signo == SIGSTOP)
{
signal(SIGSTOP, sig_handler);
printf("received SIGSTOP\n");
}
}
