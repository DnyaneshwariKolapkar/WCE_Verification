#include <stdio.h>
#include<signal.h> 
void sigproc(void);
 
void quitproc(void); 
 
main()
{ signal(SIGINT, sigproc);
		 signal(SIGQUIT, quitproc);
		 printf("ctrl-c disabled use ctrl-$\backslash$$\backslash$ to quit$\backslash$n");
		 for(;;); /* infinite loop */}
 
void sigproc()
{ 		 signal(SIGINT, sigproc); /*  */
		 /* NOTE some versions of UNIX will reset signal to default
 * 		 after each call. So for portability reset signal each time */
 
		 printf("you have pressed ctrl-c $\backslash$n");
}
 
void quitproc()
{ 		 printf("ctrl-$\backslash$$\backslash$ pressed to quit$\backslash$n");
		 exit(0); /* normal exit status */
}

    /* start a 30 seconds alarm */
    alarm(10);
    /* wait for user input */
    gets(user);
    /* remove the timer, now that we've got the user's input */
    //alarm(0);

    printf("User name: '%s'\n", user);

    return 0;
}


