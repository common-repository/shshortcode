<?php
/*
Plugin Name: SHshortcode
Plugin URI: http://www.mycardboardbox.co.uk
Description: A simple user interface for adding SyntaxHighlighter Shortcodes
Version: 0.1
Author: Chris Smith
Author URI: http://www.mycardboardbox.co.uk
*/

if ( ! defined( 'ABSPATH' ) )
	die( "Can't load this file directly" );

class SHshortcode
{
	function __construct() 
	{
		add_action( 'admin_init', array( $this, 'action_admin_init' ) );
	}
	
	function action_admin_init() 
	{
		if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) 
		{
			add_filter( 'mce_buttons', array( $this, 'filter_mce_button' ) );
			add_filter( 'mce_external_plugins', array( $this, 'filter_mce_plugin' ) );
		}
	}
	
	function filter_mce_button( $buttons ) 
	{
		array_push( $buttons, '|', 'SHshortcode_button' );
		return $buttons;
	}
	
	function filter_mce_plugin( $plugins ) 
	{
		$plugins['SHshortcode'] = plugin_dir_url( __FILE__ ) . 'SHshortcode_plugin.js';
		return $plugins;
	}
}

$SHshortcode = new SHshortcode();