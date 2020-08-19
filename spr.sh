#!/bin/bash


exec() { 

	mode=$1
	script=$2

	if [[ $mode && $script ]] 
	then 
		line="node spr_core.js $mode $script"
		result=$line
		echo $result
		#this will each the output from the node;
	elif [[ $mode || $script ]] 
		then 
			line="node spr_core.js $mode"
			result=$line
			echo $result
	else 
		echo "spr requirements not satisfied"
	fi

}



exe $1 $2